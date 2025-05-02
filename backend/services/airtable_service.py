import sys

sys.path.append(".")

from backend.config import config
import httpx
from dateparser import parse
import pytz
from datetime import datetime
from backend.services import supabase_service


AIRTABLE_API_URL = "https://api.airtable.com/v0"

HEADERS = {
    "Authorization": f"Bearer {config.AIRTABLE_PERSONAL_ACCESS_TOKEN}",
    "Content-Type": "application/json",
}


async def get_va_datetime(
    supabase: supabase_service.AsyncClient, email: str
) -> tuple[str, str]:
    response = (
        await supabase.table("time_tracker").select("*").eq("email", email).execute()
    )
    if response.data:
        return response.data[0]["start_time"], response.data[0]["end_time"]
    return None, None


async def get_va_shift(email: str) -> tuple[str, str] | tuple[None, None]:
    # get the shift of the VA from airtable
    url = f"{AIRTABLE_API_URL}/{config.VA_INFO_BASE_ID}/{config.VA_INFO_TABLE_ID}"
    params = {
        "filterByFormula": f"{{Email}}='{email}'",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        records = response.json().get("records", [])
        if records:
            # extract the shift information from the first record and parse it with timezone
            shift = records[0].get("fields", {})
            start_shift, end_shift = shift.get("Shift Start"), shift.get("Shift End")

            la_timezone = pytz.timezone("America/Los_Angeles")
            now = datetime.now(la_timezone)
            # Get the timezone name: PST or PDT
            current_tz_name = now.tzname()

            start_date = parse(f"{start_shift} {current_tz_name}").isoformat()
            end_date = parse(f"{end_shift} {current_tz_name}").isoformat()
            return start_date, end_date

        return None, None


async def update_datetime(
    supabase: supabase_service.AsyncClient,
    email: str,
    start_datetime: str,
    end_datetime: str,
):
    await (
        supabase.table("time_tracker")
        .upsert(
            {"start_time": start_datetime, "end_time": end_datetime, "email": email}
        )
        .execute()
    )


async def get_creators_info_from_airtable(
    creator_name, table_id, base_id, limit=20, offset=0
):
    # Get all records with pagination
    url = f"{AIRTABLE_API_URL}/{base_id}/{table_id}"
    params = {"pageSize": limit}
    params["offset"] = offset

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        records = response.json().get("records", [])

    creators_usernames = []
    instagram_usernames = []
    for record in records:
        fields = record.get("fields", {})
        creators_usernames.append(creator_name)
        instagram_usernames.append(fields.get("Instagram Username"))

    return instagram_usernames, creators_usernames


def check_if_record_is_in_time_shift(
    start_datetime: str, end_datetime: str, now_time: str
) -> bool:
    # Check if the VA time shift has started
    print(start_datetime, end_datetime, now_time)
    if start_datetime <= now_time <= end_datetime:
        print("Record is in time shift")
        return True
    else:
        print("Record is not in time shift")
        return False


async def get_va_aritables(
    supabase: supabase_service.AsyncClient, email: str
) -> list[dict]:
    # Validate the shift time
    start_datetime, end_datetime = await get_va_datetime(supabase, email)
    print("Supabase", start_datetime, end_datetime)
    timezone = pytz.timezone("America/Los_Angeles")
    now_time = datetime.now(timezone).isoformat()
    start_shift, end_shift = await get_va_shift(email)
    print("Airtable", start_shift, end_shift)
    if (not end_datetime) or (not start_datetime) or (end_datetime < now_time):
        await update_datetime(supabase, email, start_shift, end_shift)
        start_datetime, end_datetime = start_shift, end_shift

    # Get all records for a specific username
    url = f"{AIRTABLE_API_URL}/{config.SUMMARY_BASE_ID}/{config.SUMMARY_TABLE_ID}"
    params = {
        "filterByFormula": f"{{Email (from VA Information)}}='{email}'",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        records = response.json().get("records", [])

        # validate the records
        records = [
            record.get("fields", {})
            for record in records
            if check_if_record_is_in_time_shift(start_datetime, end_datetime, now_time)
        ]
        # print(records)
        return records


if __name__ == "__main__":
    import asyncio

    email = "john_christopher_villamin"
    asyncio.run(get_va_aritables(email))
