from argparse import ArgumentParser


# Parse the command-line arguments
parser = ArgumentParser(description="Configuration for the application.")
parser.add_argument(
    "--env",
    type=str,
    default="development",
    help="Environment to run the application in (development, production).",
)
args = parser.parse_args()
