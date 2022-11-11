function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const ANIMATION_DURATION = 300;

const SIDEBAR_EL = document.getElementById("sidebar");

const SUB_MENU_ELS = document.querySelectorAll(
".menu > ul > .menu-item.sub-menu");


const FIRST_SUB_MENUS_BTN = document.querySelectorAll(
".menu > ul > .menu-item.sub-menu > a");


const INNER_SUB_MENUS_BTN = document.querySelectorAll(
".menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a");


class PopperObject {




  constructor(reference, popperTarget) {_defineProperty(this, "instance", null);_defineProperty(this, "reference", null);_defineProperty(this, "popperTarget", null);
    this.init(reference, popperTarget);
  }

  init(reference, popperTarget) {
    this.reference = reference;
    this.popperTarget = popperTarget;
    this.instance = Popper.createPopper(this.reference, this.popperTarget, {
      placement: "right",
      strategy: "fixed",
      resize: true,
      modifiers: [
      {
        name: "computeStyles",
        options: {
          adaptive: false } },


      {
        name: "flip",
        options: {
          fallbackPlacements: ["left", "right"] } }] });





    document.addEventListener(
    "click",
    e => this.clicker(e, this.popperTarget, this.reference),
    false);


    const ro = new ResizeObserver(() => {
      this.instance.update();
    });

    ro.observe(this.popperTarget);
    ro.observe(this.reference);
  }

  clicker(event, popperTarget, reference) {
    if (
    SIDEBAR_EL.classList.contains("collapsed") &&
    !popperTarget.contains(event.target) &&
    !reference.contains(event.target))
    {
      this.hide();
    }
  }

  hide() {
    this.instance.state.elements.popper.style.visibility = "hidden";
  }}


class Poppers {


  constructor() {_defineProperty(this, "subMenuPoppers", []);
    this.init();
  }

  init() {
    SUB_MENU_ELS.forEach(element => {
      this.subMenuPoppers.push(
      new PopperObject(element, element.lastElementChild));

      this.closePoppers();
    });
  }

  togglePopper(target) {
    if (window.getComputedStyle(target).visibility === "hidden")
    target.style.visibility = "visible";else
    target.style.visibility = "hidden";
  }

  updatePoppers() {
    this.subMenuPoppers.forEach(element => {
      element.instance.state.elements.popper.style.display = "none";
      element.instance.update();
    });
  }

  closePoppers() {
    this.subMenuPoppers.forEach(element => {
      element.hide();
    });
  }}


const slideUp = (target, duration = ANIMATION_DURATION) => {
  const { parentElement } = target;
  parentElement.classList.remove("open");
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = `${duration}ms`;
  target.style.boxSizing = "border-box";
  target.style.height = `${target.offsetHeight}px`;
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};
const slideDown = (target, duration = ANIMATION_DURATION) => {
  const { parentElement } = target;
  parentElement.classList.add("open");
  target.style.removeProperty("display");
  let { display } = window.getComputedStyle(target);
  if (display === "none") display = "block";
  target.style.display = display;
  const height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = `${duration}ms`;
  target.style.height = `${height}px`;
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

const slideToggle = (target, duration = ANIMATION_DURATION) => {
  if (window.getComputedStyle(target).display === "none")
  return slideDown(target, duration);
  return slideUp(target, duration);
};

const PoppersInstance = new Poppers();

/**
 * wait for the current animation to finish and update poppers position
 */
const updatePoppersTimeout = () => {
  setTimeout(() => {
    PoppersInstance.updatePoppers();
  }, ANIMATION_DURATION);
};

/**
 * sidebar collapse handler
 */
document.getElementById("btn-collapse").addEventListener("click", () => {
  SIDEBAR_EL.classList.toggle("collapsed");
  PoppersInstance.closePoppers();
  if (SIDEBAR_EL.classList.contains("collapsed"))
  FIRST_SUB_MENUS_BTN.forEach(element => {
    element.parentElement.classList.remove("open");
  });

  updatePoppersTimeout();
});

/**
 * sidebar toggle handler (on break point )
 */
document.getElementById("btn-toggle").addEventListener("click", () => {
  SIDEBAR_EL.classList.toggle("toggled");

  updatePoppersTimeout();
});

/**
 * toggle sidebar on overlay click
 */
document.getElementById("overlay").addEventListener("click", () => {
  SIDEBAR_EL.classList.toggle("toggled");
});

const defaultOpenMenus = document.querySelectorAll(".menu-item.sub-menu.open");

defaultOpenMenus.forEach(element => {
  element.lastElementChild.style.display = "block";
});

/**
 * handle top level submenu click
 */
FIRST_SUB_MENUS_BTN.forEach(element => {
  element.addEventListener("click", () => {
    if (SIDEBAR_EL.classList.contains("collapsed"))
    PoppersInstance.togglePopper(element.nextElementSibling);else
    {
      const parentMenu = element.closest(".menu.open-current-submenu");
      if (parentMenu)
      parentMenu.
      querySelectorAll(":scope > ul > .menu-item.sub-menu > a").
      forEach(
      (el) =>
      window.getComputedStyle(el.nextElementSibling).display !==
      "none" && slideUp(el.nextElementSibling));

      slideToggle(element.nextElementSibling);
    }
  });
});

/**
 * handle inner submenu click
 */
INNER_SUB_MENUS_BTN.forEach(element => {
  element.addEventListener("click", () => {
    slideToggle(element.nextElementSibling);
  });
});










/*FORM *--------------------------*/
const getState = () => {
  const $ = (element) => {
    return document.getElementById(element).value
  }

  const state = {
    name: $('name'),
    address: $('address'),
    phone: $('phone'),
    email: $('email'),
    about: $('about'),
    career: $('career'),
    education: $('education'),
    job1: {
      date: {
        start: $('job-1__start'),
        end: $('job-1__end')
      },
      details: $('job-1__details')
    },
    job2: {
      date: {
        start: $('job-2__start'),
        end: $('job-2__end')
      },
      details: $('job-2__details')
    },
    job3: {
      date: {
        start: $('job-3__start'),
        end: $('job-3__end')
      },
      details: $('job-3__details')
    },
    references: $('references')
  }
  return state
}

const buildResume = (state) => {
  const $ = (value) => {
    document.write(value)
  }

  const styleText = `
@import url('https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background: #fafafa;
  color: rgba(0,0,0,0.75);
}

h1 {
  color: rgba(0,0,0,0.9);
}

h1, p {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px 24px;
}

.line-break {
  width: 100%;
  height: 1px;
  margin: 16px auto;
  border-bottom: 1px solid #eee;
}

.resume {
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 48px auto;
  padding: 16px 0px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.14);
}

.resume-group {
  box-sizing: border-box;
  padding: 8px 0px;
  width: 100%;
  display: flex;
  border-left: 3px solid transparent;
  transition: 0.2s;
}

.resume-group:hover {
  border-left: 3px solid #64FFDA;
}

.left-col {
  width: 35%;
}

.right-col {
  width: 65%;
}

.instructions {
  opacity: 0.5;
  text-align: center;
  font-size: 0.8rem;
  margin: 16px auto;
}
`


  const createGroup = (left, right) => {
    $('<div class="resume-group">')
    $('<div class="left-col">')
    $('<p>' + left + '</p>')
    $('</div>')
    $('<div class="right-col">')
    $('<p>' + right + '</p>')
    $('</div>')
    $('</div>')
  }

  document.open()
  $('<html><head>')
  $('<title>' + state.name + "'s Resume </title>")
  $('<style>' + styleText + '</style>')
  $('</head><body><div class="resume">')
  $('<h1>' + state.name + '</h1>')
  $('<p>' + state.email + '</p>')
  $('<p>' + state.phone + '</p>')
  $('<p>' + state.address + '</p>')
  $('<div class="line-break"></div>')
  createGroup('ABOUT ME', state.about)
  createGroup("CAREER OBJECTIVES", state.career)
  createGroup('EDUCATION', state.education)
  createGroup('EMPLOYMENT EXPERIENCE', '')
  createGroup(state.job1.date.start + ' to ' + state.job1.date.end, state.job1.details)
  createGroup(state.job2.date.start + ' to ' + state.job2.date.end, state.job2.details)
  createGroup(state.job3.date.start + ' to ' + state.job3.date.end, state.job3.details)
  createGroup('REFERENCES', state.references)
  $('</div>')
  $('<div class="instructions">Right click the page and "Save As..." to make a copy of this resume</div>')
  $('</body></html>')
  document.close()
}



const checkName = () => {
  const name = document.getElementById('name')
  const name_error = document.getElementById('name__error')
  const isValid = !!name.value
  if (!isValid) {
    name.classList.add("error__input")
    name_error.style.display = "block"
    name_error.innerHTML = " Este campo es un campo requerido"
    console.log("error")
  } else {
    name.classList.remove("error__input")
    name_error.style.display = "none"
  }
  return isValid
}

const checkEmail = () => {
  const email = document.getElementById('email')
  const email_error = document.getElementById('email__error')
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid = emailRegex.test(String(email.value).toLowerCase())
  if (!email.value) {
    email.classList.add("error__input")
    email_error.style.display = "block"
    email_error.innerHTML = " Este campo es un campo requerido"
  } else {
    if (!isValid) {
      email.classList.add("error__input")
      email_error.style.display = "block"
      email_error.innerHTML = " Este campo es un invalido"
    } else {
      email.classList.remove("error__input")
      email_error.style.display = "none"
    }
  }
  return isValid
}

const checkValidity = () => {
  const nameIsValid = checkName()
  const emailIsValid = checkEmail()
  if (!nameIsValid) {
    location.hash = "#name"
  } else if (!emailIsValid) {
    location.hash = "#email"
  }
  return nameIsValid && emailIsValid
}

document.getElementById('create-resume').addEventListener("click", (e) => {
  e.preventDefault()
  const isValid = checkValidity()
  if (isValid) buildResume(getState())
})

document.getElementById('name').addEventListener('blur', checkName)

document.getElementById('email').addEventListener('blur', checkEmail)

