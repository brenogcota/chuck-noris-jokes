import { api, postForm } from "../../../service/api";

async function getRandonJoke() {
  const request = await api.get("random");
  const response = request.data;
  return response;
}

let Home = {
  is_private: false,

  render: async () => {
    const jokes = await getRandonJoke();

    let view = `
        <section class="container">
          <h1>Chuck Norris Jokes</h1>
          <div class="container">
            <img id="image" src=${jokes.icon_url}>
          </div>
          <p>${jokes.value}</p>
        </section>
        <section class="form-container">
          <h2>Faker Webhook form</h2>
          <form name="form" class="form">
            <input type="text" id="name" placeholder="name"/>
            <input type="text" id="email" placeholder="email"/>
            <input type="text" id="phone" placeholder="phone"/>
            <input type="submit" value="Enviar"/>
          </form>
        </section>

        <div class="loading"> Loading...</div>
    `;

      return view
  },

  after_render: async () => {
      const form = document.forms.form;

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let loading = document.querySelector(".loading");
        loading.classList.add("active");

        const { name, email, phone } = form;

        let postData = {
          name,
          email,
          phone,
        };

        postForm
          .post("", postData)
          .then((response) => {
            loading.classList.remove("active");
            alert("Success!", e);
            console.log(response);
          })
          .catch((e) => {
            loading.classList.remove("active");
            alert("OPS, an error occurred: ", e);
          });
      });
  },
}

export default Home;