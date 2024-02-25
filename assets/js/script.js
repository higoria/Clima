const btn = document.querySelector(".pesquisa");
const cidadeNome = document.querySelector("#nome-cidade");
const cidadeDoUsuario = document.querySelector(".titulo-cidade");
const temperatura = document.querySelector(".tempo-valor");
const temperaturaMax = document.querySelector(".tempo-max");
const temperaturaMin = document.querySelector(".tempo-min");
const humidade = document.querySelector(".tempo-humidade");
const vento = document.querySelector(".tempo-vento");
const descriçao = document.querySelector(".tempo-descriçao");
const img = document.querySelector(".img");
const conteinerResultado = document.querySelector(".resultado");

btn.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!cidadeNome.value) {
    conteinerResultado.classList.remove("active");
    return showAlert("Vocé precisa digitar uma cidade!");
  }

  const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    cidadeNome.value
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  const resultados = await fetch(apiUrl);
  const resultadoJSON = await resultados.json();

  if (resultadoJSON.cod === 200) {
    showAlert("");
    cidadeDoUsuario.innerText = resultadoJSON.name;
    img.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${resultadoJSON.weather[0].icon}@2x.png`
    );
    temperatura.innerHTML =
      resultadoJSON.main.temp.toFixed(1).toString().replace(".", ",") +
      "<sup>°C</sup>";
    descriçao.innerText = resultadoJSON.weather[0].description;
    temperaturaMax.innerText = resultadoJSON.main.temp_max.toFixed(1);
    temperaturaMin.innerText = resultadoJSON.main.temp_min.toFixed(1);
    humidade.innerText = resultadoJSON.main.humidity + "%";
    vento.innerText = resultadoJSON.wind.speed + "km/h";
    conteinerResultado.classList.add("active");
  } else {
    conteinerResultado.classList.remove("active");
    showAlert("Não foi possivel localizar a sua cidade!");
  }
});

function showAlert(mensagem) {
  const divAlerta = document.querySelector(".alert");
  divAlerta.innerHTML = mensagem;
}
