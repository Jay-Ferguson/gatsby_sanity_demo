const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your recent order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
  <ul>
${order
  .map(
    (item) => `<li>
<img src="${item.thumbnail} alt="${item.name}"/>
${item.name} ${item.name} - ${item.price}
</li>`
  )
  .join('')}
  </ul>
  <p> Your total is <strong>$${total}</strong> due at pickup </p>
  </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: '587',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
// test send an email

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // check if honeypot is filled
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep you are a bot 3424' }),
    };
  }
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Opps you are missing the ${field}` }),
      };
    }
  }

  // make sure the order has items in the submitted order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `why are you ordering nothing?` }),
    };
  }

  // send the email

  const info = await transporter.sendMail({
    from: "Slick's slices <slick@example.com>",
    to: `${body.name} <${body.email}>, oder@examples.com`,
    subject: 'new order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Succsess' }),
  };
};
