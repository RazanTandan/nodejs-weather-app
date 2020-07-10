let form = document.querySelector("form");
console.log(form);
let msgBox1 = document.querySelector('#msg-box-1');
let msgBox2 = document.querySelector('#msg-box-2');


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = form.elements[0].value;
  msgBox1.textContent = 'Loading...';
  msgBox2.textContent =  '';

  fetch(`/weather?location=${location}`)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if(data.error){
            return msgBox1.textContent = data.error;
        }
      msgBox1.textContent = data.location;
      msgBox2.textContent = data.forecast;
    }).catch(() => {
        msgBox1.textContent = 'Unable to fetch data.';
    })
});
