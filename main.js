const API = " http://localhost:8000/contacts";
let inpname = document.getElementById("inp-name");
let inpEmail = document.getElementById("inp-Email");
let inpNumber = document.getElementById("inp-Number");
let inpImgUrl = document.getElementById("inp-ImgUrl");
let btnAdd = document.getElementById("btn-add");


btnAdd.addEventListener("click", async () => {
  let newTodo = {
    name: inpname.value,
    Email: inpEmail.value,
    Number: inpNumber.value,
    ImgUrl: inpImgUrl.value,
  };
  console.log(newTodo);
  if (inpname.value.trim() == "") {
    alert("Введите текс");
    return;
  } else if (inpEmail.value.trim() == "") {
    alert("Введите Email");
    return;
  } else if (inpNumber.value.trim() == "") {
    alert("Введите номер");
    return;
  } else if (inpImgUrl.value.trim() == "") {
    alert("Введите ImgUrl");
    return;
  }
  await fetch(API, {
    method: "post",
    body: JSON.stringify(newTodo),
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
  inpname.value = "";
  inpEmail.value = "";
  inpNumber.value = "";
  inpImgUrl.value = "";
  localStorage.getItem(
    newTodo.name,
    newTodo.Email,
    newTodo.Number,
    newTodo.ImgUrl
  );
  getTodos();
});

let list = document.getElementById("list");
getTodos();


async function getTodos() {
  let responce = await fetch(API).then((res) => res.json());
  list.innerHTML = "";
  responce.forEach((item) => {
    let newElem = document.createElement("div");
    newElem.id = item.id;
    newElem.innerHTML = `
        <span>${item.name}</span>
        <span>${item.Email}</span>
        <span>${item.Number}</span>
        <img src="${item.ImgUrl}"></img>
        <button class="btn-delete">delete</button>
        <button class="btn-edit">edit</button>
        `;
    list.append(newElem);
  });
}

document.addEventListener("click", async (e) => {
  if (e.target.className === "btn-delete") {
    let id = e.target.parentNode.id;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    getTodos();
  }
    //  Update
  if (e.target.className === "btn-edit") {
    modalEdit.style.display = "flex";
    let id = e.target.parentNode.id;
    let responce = await fetch(`${API}/${id}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    getTodos();
    inpEditname.value = responce.name;
    inpEditEmail.value = responce.Email;
    inpEditNumber.value = responce.Number;
    inpEditImgUrl.value = responce.ImgUrl;
    inpEditname.className = responce.id;
    inpEditEmail.className = responce.id;
    inpEditNumber.className = responce.id;
    inpEditImgUrl.className = responce.id;
  }
});

let modalEdit = document.querySelector("#modal-edit");

let modalEditClose = document.querySelector("#modal-edit-close");

let inpEditname = document.querySelector("#inp-edit-name");

let inpEditEmail = document.querySelector("#inp-edit-Email");

let inpEditNumber = document.querySelector("#inp-edit-Number");

let inpEditImgUrl = document.querySelector("#inp-edit-ImgUrl");

let inpEditId = document.querySelector("#inp-edit-id");

let btnsaveEdit = document.querySelector("#btn-save-edit");

// console.log(modalEdit,modalEditClose,inpEditId,inpEditTodo);

modalEditClose.addEventListener("click", () => {
  modalEdit.style.display = "none";
});

btnsaveEdit.addEventListener("click", async () => {
  let editedTodo = {
    name: inpEditname.value,
    Email: inpEditEmail.value,
    Number: inpEditNumber.value,
    ImgUrl: inpEditImgUrl.value,
  };
  let id = inpEditname.className;
  let id1 = inpEditEmail.className;
  let id2 = inpEditNumber.className;
  let id3 = inpEditImgUrl.className;
  console.log(id);
  console.log(editedTodo);
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  await fetch(`${API}/${id1}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  await fetch(`${API}/${id2}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  await fetch(`${API}/${id3}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  modalEdit.style.display = "none";
  getTodos();
});

