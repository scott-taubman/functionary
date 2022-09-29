import pytest
import requests
from click.testing import CliRunner

from functionary.login import login_cmd


def response_200(*args, **kwargs):
    response = requests.Response()
    response.status_code = 200
    response._content = b'{"token": "somegreattoken"}'

    return response


@pytest.mark.usefixtures("config")
def test_login(monkeypatch):
    monkeypatch.setattr(requests, "post", response_200)
    runner = CliRunner()
    result = runner.invoke(
        login_cmd, ["-u", "user", "http://test:1234"], input="password"
    )

    assert result.exit_code == 0
    assert "success" in result.output
