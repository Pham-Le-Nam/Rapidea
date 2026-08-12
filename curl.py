"""Small command-line client for Rapidea authentication endpoints.

Example:
    python curl.py register --email you@example.com --first-name Jane --last-name Doe
"""

import argparse
import getpass
import os
import sys

import requests


DEFAULT_API_URL = os.getenv("RAPIDEA_API_URL", "http://rapidea-backend.ap-southeast-2.elasticbeanstalk.com")


def register_account(args: argparse.Namespace) -> int:
    password = args.password or getpass.getpass("Password: ")
    confirm_password = args.confirm_password or getpass.getpass("Confirm password: ")

    payload = {
        "email": args.email,
        "password": password,
        "confirmPassword": confirm_password,
        "firstname": args.first_name,
        "lastname": args.last_name,
        "middlename": args.middle_name,
    }

    try:
        response = requests.post(
            f"{args.api_url.rstrip('/')}/api/auth/register",
            json=payload,
            timeout=30,
        )
    except requests.RequestException as error:
        print(f"Registration request failed: {error}", file=sys.stderr)
        return 1

    try:
        body = response.json()
    except ValueError:
        body = {"message": response.text or "The server returned no JSON response."}

    if not response.ok:
        message = body.get("message", body) if isinstance(body, dict) else body
        print(f"Registration failed ({response.status_code}): {message}", file=sys.stderr)
        return 1

    message = body.get("success_message", "Registration request accepted.")
    print(message)
    print("Open the verification email to verify ownership and create the account.")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Call Rapidea backend endpoints.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    register = subparsers.add_parser("register", help="Register and send an email-verification link.")
    register.add_argument("--email", required=True)
    register.add_argument("--first-name", required=True)
    register.add_argument("--last-name", required=True)
    register.add_argument("--middle-name", default="")
    register.add_argument("--password", help="Avoid this option on shared systems; omit it for a hidden prompt.")
    register.add_argument("--confirm-password", help="Omit it for a hidden confirmation prompt.")
    register.add_argument("--api-url", default=DEFAULT_API_URL)
    register.set_defaults(handler=register_account)

    return parser


def main() -> int:
    args = build_parser().parse_args()
    return args.handler(args)


if __name__ == "__main__":
    raise SystemExit(main())
