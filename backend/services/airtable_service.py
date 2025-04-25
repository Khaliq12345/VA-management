from backend.config import config
import httpx


AIRTABLE_API_URL = "https://api.airtable.com/v0"

HEADERS = {
    "Authorization": f"Bearer {config.AIRTABLE_PERSONAL_ACCESS_TOKEN}",
    "Content-Type": "application/json",
}


async def get_creator_info_from_airtable(table_id, base_id, limit=20, offset=0):
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
        if fields.get("Creator Name"):
            creators_usernames.append(fields.get("Creator Name"))
            instagram_usernames.append(fields.get("Instagram Username"))

    return instagram_usernames, creators_usernames
