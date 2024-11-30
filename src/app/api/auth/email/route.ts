import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    const { issue, wallet, platform, option, additionalDetails } = await req.json()
    
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    await new Promise((resolve, reject) => {
        transporter.verify(function(error, success) {
            if (error){
              console.log(error)
              reject(error)
            }else{
              console.log('Server succesfully ready to send mail to recipients and more...')
              resolve(success)
            }
          })
    })

    const recipients = [process.env.RECIPIENT1, process.env.RECIPIENT2]
    for(const recipient of recipients) {
        const mailOpts = {
            from: process.env.MAIL_USERNAME,
            to: recipient,
            subject: `New issue Reported: ${issue}`,
            text: `
            Issue: ${issue}
            Wallet: ${wallet}
            Platform: ${platform}
            Connection Method: ${option}
            Additional Details: ${additionalDetails}
          `,
          html: `
          <h2>New Issue Reported</h2>
          <p><strong>Issue:</strong> ${issue}</p>
          <p><strong>Wallet:</strong> ${wallet}</p>
          <p><strong>Platform:</strong> ${platform}</p>
          <p><strong>Connection Method:</strong> ${option}</p>
          <p><strong>Additional Details:</strong> ${additionalDetails}</p>
        `,
        }

        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOpts, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }else{
                    console.log(`Email sent to ${recipient}: ` + info.response);
                    resolve(info);
                }

            })
        })
    }


}