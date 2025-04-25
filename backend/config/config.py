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

# --------APP-------------
APP_ENV = cli_parser.args.env

# --------Airtable-------------
AIRTABLE_PERSONAL_ACCESS_TOKEN = os.getenv("AIRTABLE_PERSONAL_ACCESS_TOKEN")
