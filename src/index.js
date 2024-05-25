//Event listerner to set man function to run when HTML doc is loaded 
//elements needed for button to display form when adding a new dog and the main container to display dog/s
document.addEventListener("DOMContentLoaded", () => {
    const formButton = document.querySelector(".dogs-list__button--add")
    const dogContainer = document.querySelector(".main")
  
    // Creates a list item for a dog and sets up a click event listener to display the dog's card when clicked
    //output needed is a list item that when click event happens show the dogs details 
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
  
    // Creates a section element with a specific class name
    function createSection() {
      const section = document.createElement("section")
      section.className = "main__dog-section"
      return section
    }
  
    // Creates a description section for a dog card
    //needs to include header for bio as well as bio
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
  
    // Creates the bottom section of a dog card, including a button and status text
    //function with dog object
    //create the elements needed <button, "p" text and the footer div
    //assign button to footer element (style purposes)
    //content for good/bad dog
    //t/f statment to support good/bad dog functionality
    //click event listener to alter between the two.
    //append to footer and return the footer 
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
  
    // Create the entire dog card, assembling the header, image, description, and footer sections
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
  
    // Set up the form button to clear the main container and display the form for adding a new dog
    formButton.addEventListener("click", () => {
      dogContainer.innerHTML = ""
      dogContainer.appendChild(renderAddDogForm())
    })
  
    // Render the form for adding a new dog, including the header and the form elements
    function renderAddDogForm() {
      const section = createSection()
      const form = createForm()
      const header = document.createElement("h2")
  
      header.innerText = "Add a new Dog"
  
      section.append(header, form)
  
      return section
    }
  
    // Create the form for adding a new dog and sets up the submit event listener to add the dog to the list
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
  
    // Create an input element, setting type, id, and name attributes, and optionally setting a value
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
  
    // Create a label element and sets its attributes
    function createLabel(forAttr, text) {
      const label = document.createElement("label")
      label.htmlFor = forAttr
      label.innerText = text
  
      return label
    }
  
    // Render the list of dogs by creating list items for each dog and appending them to the list container
    function renderDogList(dogs) {
      const listContainer = document.querySelector(".dogs-list")
      for (const dog of dogs) {
        const listItem = createDogListItem(dog)
        listContainer.append(listItem)
      }
    }
  
    // Call renderDogList to display the initial list of dogs
    renderDogList(data)
  })
  