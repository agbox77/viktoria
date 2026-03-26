const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

exports.handler = async (event) => {
  const path = event.path.replace(/\/\.netlify\/functions\/auth\/?/, '');
  const segments = path.split('/').filter(Boolean);

  // /auth/github — редирект на GitHub OAuth
  if (segments[0] === 'github' && !segments[1]) {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      scope: 'repo,user',
      redirect_uri: `${process.env.URL}/.netlify/functions/auth/github/callback`,
    });
    return {
      statusCode: 302,
      headers: { Location: `https://github.com/login/oauth/authorize?${params}` },
      body: '',
    };
  }

  // /auth/github/callback — обмен кода на токен
  if (segments[0] === 'github' && segments[1] === 'callback') {
    const code = event.queryStringParameters?.code;
    if (!code) {
      return { statusCode: 400, body: 'Missing code' };
    }

    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
      });

      const data = await response.json();

      if (data.error) {
        return {
          statusCode: 400,
          body: renderHTML('error', data.error_description || data.error),
        };
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: renderHTML('success', data.access_token),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: renderHTML('error', err.message),
      };
    }
  }

  return { statusCode: 404, body: 'Not found' };
};

function renderHTML(status, content) {
  const message =
    status === 'success'
      ? `{"token":"${content}","provider":"github"}`
      : `{"error":"${content}"}`;

  return `<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:${status}:${message.replace(/'/g, "\\'")}',
        e.origin
      );
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
</body>
</html>`;
}
