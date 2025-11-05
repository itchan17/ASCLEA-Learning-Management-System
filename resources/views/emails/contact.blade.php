<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>New Enrollment Request</title>
    <style type="text/css" rel="stylesheet" media="all">
      /* Base ------------------------------ */
      *:not(br):not(tr):not(html) {
        font-family: "Nunito-sans", "Helvetica Neue", Helvetica, sans-serif;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        line-height: 1.4;
        background-color: #f5f7f9;
        color: #839197;
        -webkit-text-size-adjust: none;
      }
      a {
        color: #414ef9;
      }

      /* Layout ------------------------------ */
      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #e4e4ff;
      }
      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
      }

      /* Masthead ----------------------- */
      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }
      .email-masthead_logo {
        max-width: 400px;
        border: 0;
      }
      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #839197;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }

      /* Body ------------------------------ */
      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        border-top: 1px solid #e7eaec;
        border-bottom: 1px solid #e7eaec;
        background-color: #e4e4ff;
      }
      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        background-color: #ffffff;
      }
      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        text-align: center;
      }
      .email-footer p {
        color: #839197;
      }
      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        text-align: center;
      }
      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #e7eaec;
      }
      .content-cell {
        padding: 35px;
      }
      .align-right {
        text-align: right;
      }

      /* Type ------------------------------ */
      h1 {
        margin-top: 0;
        color: #313131;
        font-size: 19px;
        font-weight: bold;
        text-align: left;
      }
      h2 {
        margin-top: 0;
        color: #313131;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }
      h3 {
        margin-top: 0;
        color: #313131;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }
      p {
        margin-top: 0;
        color: #545454;
        font-size: 16px;
        line-height: 1.5em;
        text-align: left;
      }
      p.sub {
        font-size: 12px;
      }
      p.center {
        text-align: center;
      }

      /* Info Box ------------------------------ */
      .info-box {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 15px;
        margin: 20px 0;
      }
      .info-box p {
        margin: 5px 0;
        color: #495057;
      }
      .info-box strong {
        color: #212529;
      }

      /*Media Queries ------------------------------ */
      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body style="font-family: 'Nunito Sans', sans-serif">
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table
            class="email-content"
            width="100%"
            cellpadding="0"
            cellspacing="0"
          >
            <!-- Logo -->
            <tr>
              <td class="email-masthead">
                <a class="email-masthead_name">ASCLEA Learning Management System</a>
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-cell">
                      <h1>New Enrollment Request</h1>
    <p>You have received a new enrollment request from the landing page enrollment form.</p>
                      
                      <div class="info-box">
                        <p><strong>Name:</strong> {{ $name }}</p>
                        <p><strong>Email:</strong> {{ $email }}</p>
                        <p><strong>Submitted at:</strong> {{ $timestamp }}</p>
                      </div>
                      
                      <h2>Message:</h2>
                      <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #01007d;">
                        {{ $messageContent }}
                      </p>
                      
                      <p>Please respond to this inquiry as soon as possible.</p>
                      
                      <table class="body-sub">
                        <tr>
                          <td>
                            <p class="sub">This email was sent automatically from the ASCLEA Learning Management System landing page contact form.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table
                  class="email-footer"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="sub align-center">
                        © {{ date('Y') }} ASCLEA Learning Management System. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>