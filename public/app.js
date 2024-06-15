document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "update") {
    const razmetka = event.target.closest("li");
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const initialEdit = razmetka.innerHTML;

    razmetka.innerHTML = `
      <input type='text' value="${title}">
      <div>
        <button class="btn btn-success" data-type="save" >Сохранить</button>
        <button class="btn btn-danger" data-type="cancle">Отменить</button>
      </div>
    `;

    const obrabot = ({ target }) => {
      if (target.dataset.type === "cancle") {
        razmetka.innerHTML = initialEdit;
      } else if (target.dataset.type === "save") {
        const inputValue = razmetka.querySelector("input").value;
        if (inputValue) {
          update(id, inputValue).then(() => {
            razmetka.innerHTML = initialEdit;
            razmetka.querySelector("span").textContent = inputValue;
            razmetka.querySelector("[data-type=update]").dataset.title =
              inputValue;
          });
        }
      }
    };

    razmetka.addEventListener("click", obrabot);
  }
});

async function update(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ title }),
  });
}

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}
