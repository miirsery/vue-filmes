//TODO: Изображение не будет отображаться. Возможно, из-за http, а не https

const rendersSeats = (currentSeats: any): string[] => {
  return currentSeats
    .map((seat: any) => `<div class="email__place"> ${seat.y_position} row - ${seat.seat} seat </div>`)
    .join('')
}
const renderHtml = (
  title: string,
  totalPrice: number,
  preview: string,
  date: string,
  time: string,
  hallId: number,
  cinema: any,
  seats: any
): string => {
  return `
  <!DOCTYPE html>
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title>Document</title>

  <style>
   *, *, *::after, *::before {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
   }
   .container {
       max-width: 800px;
       margin: 0 auto;
   }
   .text-big {
       font-size: 28px;
       font-weight: 600;
   }
   .text-middle {
       font-size: 20px;
       font-weight: 500;
   }
   .d-flex {
       display: flex;
   }
   .w-100 {
       width: 100%;
   }
   .t-center {
       text-align: center;
   }
   .email__movie-preview {
       width: 300px;
       height: 150px;
       margin-right: 20px;
   }
   .email__movie-preview img {
       width: 100%;
       height: 100%;
       object-fit: cover;
   }
   .email__movie-title {
       margin-bottom: 8px;
   }
  </style>

</head>
<body>
   <div class='container'>
      <div class='email'>
        <div class='email__header text-big t-center'>
          Thank you for buy ticket
        </div>
        <div class='email__content d-flex w-100'>
          <div class='email__movie-preview'>
            <!--            <img src='${preview}' alt='movie' />-->
          </div>
          <div>
            <div class='email__movie-title text-middle'>
              ${title}
            </div>
            <div class='email__movie-title text-middle'>
              ${cinema.address}
            </div>
            <div class='email__movie-title text-middle'>
              date: ${date} | time: ${time}
            </div>
          </div>
        </div>
        <div class='email__places text-middle'>
          ${rendersSeats(seats)}
        </div>
        <br/>
        <div class='email__movie-title text-middle'>
              Total price: ${totalPrice}
        </div>
      </div>
   </div>
</body>
</html>
  `
}
module.exports = {
  renderHtml,
}
