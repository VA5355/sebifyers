export const welcomeEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Welcome to Onedinaar</title>

<!-- Optional Tailwind for browser preview -->
<script src="https://cdn.tailwindcss.com"></script>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
  }

  table {
    border-spacing: 0;
  }

  .wrapper {
    width: 100%;
    background: linear-gradient(180deg, #eef4ff 0%, #ffffff 100%);
    padding: 40px 15px;
  }

  .container {
    max-width: 620px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  }

  .hero {
    padding: 45px 35px 25px;
    text-align: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  }

  .logo {
    width: 170px;
    max-width: 100%;
  }

  .content {
    padding: 40px 35px;
    text-align: center;
  }

  .title {
    font-size: 32px;
    line-height: 40px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #111827;
  }

  .username {
    color: #2563eb;
  }

  .description {
    font-size: 16px;
    line-height: 28px;
    color: #4b5563;
    margin-bottom: 35px;
  }

  .button {
    display: inline-block;
    padding: 16px 34px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: #ffffff !important;
    text-decoration: none;
    border-radius: 999px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.3);
  }

  .footer {
    padding: 25px;
    text-align: center;
    background: #f9fafb;
    color: #6b7280;
    font-size: 13px;
  }

  .footer a {
    color: #2563eb;
    text-decoration: none;
  }

  @media screen and (max-width: 600px) {
    .hero {
      padding: 35px 20px 20px;
    }

    .content {
      padding: 30px 20px;
    }

    .title {
      font-size: 26px;
      line-height: 34px;
    }

    .description {
      font-size: 15px;
      line-height: 24px;
    }

    .button {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
</head>

<body>

<div class="wrapper">

  <div class="container">

    <!-- HERO -->
    <div class="hero">
      <img
        src="https://onedinaar.com/splash-logo-new.png"
        alt="Onedinaar"
        class="logo"
      />
    </div>

    <!-- CONTENT -->
    <div class="content">

      <div class="title">
        Welcome,
        <span class="username">{{username}}</span>
      </div>

      <div class="description">
        Thank you for joining Onedinaar.<br /><br />
        Note you user id : {{virtualId}}
        Your account setup is almost complete.
        Please confirm your registration and activate your profile to continue accessing our platform.
      </div>

      <a
        href="{{resetUrl}}"
        target="_blank"
        class="button"
      >
        Complete Registration
      </a>

    </div>

    <!-- FOOTER -->
    <div class="footer">
      © 2026 Onedinaar. All rights reserved.
      <br /><br />

      <a href="{{{unsubscribe}}}">Unsubscribe</a>
      &nbsp; | &nbsp;
      <a href="{{{unsubscribe_preferences}}}">
        Email Preferences
      </a>
    </div>

  </div>

</div>

</body>
</html>
`;
