from dotenv import load_dotenv
import os
from backend.utils import cli_parser

# Load environment variables based on the specified environment
if cli_parser.args.env == "production":
    load_dotenv("./backend/.env")
else:
    load_dotenv("./backend/.env.dev")


# --------Supabase-------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SIGNUP_API_KEY = os.getenv("SIGNUP_API_KEY")

# --------APP-------------
APP_ENV = cli_parser.args.env

# --------Airtable-------------
AIRTABLE_PERSONAL_ACCESS_TOKEN = os.getenv("AIRTABLE_PERSONAL_ACCESS_TOKEN")
SUMMARY_TABLE_ID = os.getenv("summary_table_id")
SUMMARY_BASE_ID = os.getenv("summary_base_id")

VA_INFO_TABLE_ID = os.getenv("va_info_table_id")
VA_INFO_BASE_ID = os.getenv("va_info_base_id")
