from dotenv import load_dotenv
import httpx
import os

load_dotenv()

AIRTABLE_API_URL = "https://api.airtable.com/v0"
AIRTABLE_PERSONAL_ACCESS_TOKEN = os.getenv("AIRTABLE_PERSONAL_ACCESS_TOKEN")

HEADERS = {
    "Authorization": f"Bearer {AIRTABLE_PERSONAL_ACCESS_TOKEN}",
    "Content-Type": "application/json",
}


async def get_creator_info_from_airtable(table_id, base_id, limit=20, offset=None):
    url = f"{AIRTABLE_API_URL}/{base_id}/{table_id}"
    params = {"pageSize": limit}
    if offset:
        params["offset"] = offset

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        records = response.json().get("records", [])

    creators_usernames = []
    instagram_usernames = []
    for record in records:
        fields = record.get("fields", {})
        creators_usernames.append(fields.get("Creator Name"))
        instagram_usernames.append(fields.get("Instagram Username"))

    return instagram_usernames, creators_usernames
