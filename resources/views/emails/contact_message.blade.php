<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>New Contact Request</title>
    <style type="text/css" rel="stylesheet" media="all">
      *:not(br):not(tr):not(html) {
        /* Landing page body font */
        font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        line-height: 1.4;
        background-color: #f5f7f9;
        color: #313131;
        -webkit-text-size-adjust: none;
      }
      a { color: #01007d; }

      .email-wrapper { width: 100%; margin: 0; padding: 0; background-color: #e4e4ff; }
      .email-content { width: 100%; margin: 0; padding: 0; }

      .email-masthead { padding: 25px 0; text-align: center; }
      .email-body { width: 100%; margin: 0; padding: 0; border-top: 1px solid #e7eaec; border-bottom: 1px solid #e7eaec; background-color: #e4e4ff; }
      .email-body_inner { width: 570px; margin: 0 auto; padding: 0; background-color: #ffffff; }
      .email-footer { width: 570px; margin: 0 auto; padding: 0; text-align: center; }
      .content-cell { padding: 0; }

      /* Header bar styled to mirror landing page accents */
      .card-header { background-color: #01007d; color: #ffffff; padding: 12px 16px; }
      /* Use the landing page heading font with safe fallbacks */
      .card-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.3;
        font-family: "Shippori Mincho", Georgia, "Times New Roman", serif;
        letter-spacing: 0.2px;
      }
      .card-body { padding: 35px; }
      .label { font-weight: bold; font-family: "Shippori Mincho", Georgia, "Times New Roman", serif; }
      .field, .card-body p, .card-body div { font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; }
      .field { margin: 8px 0 16px; }

      @media only screen and (max-width: 600px) {
        .email-body_inner, .email-footer { width: 100% !important; }
      }
    </style>
  </head>
  <body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td class="email-masthead" align="center">
                <img src="{{ $message->embed(public_path('images/ascend_logo.png')) }}" alt="ASCEND Logo" width="150" />
              </td>
            </tr>
            <tr>
              <td class="email-body" width="100%">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-cell">
                      <div class="card-header">
                        <h2>New Contact Request</h2>
                      </div>
                      <div class="card-body">
                        <p class="field"><span class="label">Name:</span> {{ $name }}</p>
                        <p class="field"><span class="label">Email:</span> <a href="mailto:{{ $email }}">{{ $email }}</a></p>
                        <div class="field">
                          <div class="label">Message:</div>
                          <div>{{ $messageContent }}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-cell" style="padding: 20px 0;">
                      <p style="font-size:12px; color:#839197; text-align:center;">
                        ASCEND:Center for Professional Advancement<br />
                        611 JPRizal Boulevard, Brgy. Labas, City of Santa Rosa, Laguna
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