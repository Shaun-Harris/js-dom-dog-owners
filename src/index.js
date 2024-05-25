document.addEventListener("DOMContentLoaded", () => {
    const formButton = document.querySelector(".dogs-list__button--add")
    const dogContainer = document.querySelector(".main")

    function createDogListItem(dog) {
      const listItem = document.createElement("li")
      listItem.className = "dogs-list__button"
      listItem.innerText = dog.name
  
      listItem.addEventListener("click", () => {
        dogContainer.innerHTML = ""
        dogContainer.appendChild(createDogCard(dog))
      })
  
      return listItem
    }
  
    function createSection() {
      const section = document.createElement("section")
      section.className = "main__dog-section"
      return section
    }
  
    function createDogCardDescription(bio) {
      const descriptionDiv = document.createElement("div")
      descriptionDiv.className = "main__dog-section__desc"
  
      const header = document.createElement("h3")
      header.innerText = "Bio"
  
      const text = document.createElement("p")
      text.innerText = bio
  
      descriptionDiv.append(header, text)
  
      return descriptionDiv
    }
  
    function createDogCardFooter(dog) {
      const button = document.createElement("button")
      const statusText = document.createElement("p")
      const footerDiv = document.createElement("div")
  
      footerDiv.className = "main__dog-section__btn"
  
      button.innerText = dog.isGoodDog ? "Bad Dog" : "Good Dog"
      statusText.innerText = `Is naughty? ${dog.isGoodDog ? "no" : "yes"}`
  
      button.addEventListener("click", () => {
        dog.isGoodDog = !dog.isGoodDog
        button.innerText = dog.isGoodDog ? "Bad Dog" : "Good Dog"
        statusText.innerText = `Is naughty? ${dog.isGoodDog ? "no" : "yes"}`
      })
  
      footerDiv.append(statusText, button)
      return footerDiv
    }
  
    function createDogCard(dog) {
      const section = createSection()
      const header = document.createElement("h2")
      header.innerText = dog.name
  
      const img = document.createElement("img")
      img.src = dog.image
  
      const description = createDogCardDescription(dog.bio)
      const footer = createDogCardFooter(dog)
  
      section.append(header, img, description, footer)
  
      return section
    }
  
    formButton.addEventListener("click", () => {
      dogContainer.innerHTML = ""
      dogContainer.appendChild(renderAddDogForm())
    })
  
    function renderAddDogForm() {
      const section = createSection()
      const form = createForm()
      const header = document.createElement("h2")
  
      header.innerText = "Add a new Dog"
  
      section.append(header, form)
  
      return section
    }

    function createForm() {
      const form = document.createElement("form")
  
      const nameInput = createInput("name")
      const imgInput = createInput("image", "url")
      const bioInput = createInput("bio", "textarea")
      const submitButton = createInput("submit", "submit", "Let's add a dog!")
  
      const nameLabel = createLabel("name", "Dog's name")
      const imgLabel = createLabel("image", "Dog's picture")
      const bioLabel = createLabel("bio", "Dog's bio")
  
      form.className = "form"
      submitButton.className = "form__button"
  
      form.addEventListener("submit", (event) => {
        event.preventDefault()
  
        const newDog = {
          name: nameInput.value,
          image: imgInput.value,
          bio: bioInput.value,
          isGoodDog: true,
        }
  
        data.unshift(newDog)
        const listContainer = document.querySelector(".dogs-list")
        const newListItem = createDogListItem(newDog)
        listContainer.insertBefore(newListItem, formButton.nextSibling)
      })
  
      form.append(
        nameLabel,
        nameInput,
        imgLabel,
        imgInput,
        bioLabel,
        bioInput,
        submitButton
      )
      return form
    }

    function createInput(id, type = "text", value) {
      let input
  
      if (type === "textarea") {
        input = document.createElement("textarea")
        input.setAttribute("rows", "5")
      } else {
        input = document.createElement("input")
        input.setAttribute("type", type)
      }
  
      input.setAttribute("id", id)
      input.setAttribute("name", id)
  
      if (value) input.setAttribute("value", value)
  
      return input
    }
  
    function createLabel(forAttr, text) {
      const label = document.createElement("label")
      label.htmlFor = forAttr
      label.innerText = text
  
      return label
    }
  
    function renderDogList(dogs) {
      const listContainer = document.querySelector(".dogs-list")
      for (const dog of dogs) {
        const listItem = createDogListItem(dog)
        listContainer.append(listItem)
      }
    }
 
    renderDogList(data)
  })
  