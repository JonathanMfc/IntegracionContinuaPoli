"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var ANIMATION_DURATION = 300;
var SIDEBAR_EL = document.getElementById("sidebar");
var SUB_MENU_ELS = document.querySelectorAll(".menu > ul > .menu-item.sub-menu");
var FIRST_SUB_MENUS_BTN = document.querySelectorAll(".menu > ul > .menu-item.sub-menu > a");
var INNER_SUB_MENUS_BTN = document.querySelectorAll(".menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a");

var PopperObject = /*#__PURE__*/function () {
  function PopperObject(reference, popperTarget) {
    (0, _classCallCheck2["default"])(this, PopperObject);

    _defineProperty(this, "instance", null);

    _defineProperty(this, "reference", null);

    _defineProperty(this, "popperTarget", null);

    this.init(reference, popperTarget);
  }

  (0, _createClass2["default"])(PopperObject, [{
    key: "init",
    value: function init(reference, popperTarget) {
      var _this = this;

      this.reference = reference;
      this.popperTarget = popperTarget;
      this.instance = Popper.createPopper(this.reference, this.popperTarget, {
        placement: "right",
        strategy: "fixed",
        resize: true,
        modifiers: [{
          name: "computeStyles",
          options: {
            adaptive: false
          }
        }, {
          name: "flip",
          options: {
            fallbackPlacements: ["left", "right"]
          }
        }]
      });
      document.addEventListener("click", function (e) {
        return _this.clicker(e, _this.popperTarget, _this.reference);
      }, false);
      var ro = new ResizeObserver(function () {
        _this.instance.update();
      });
      ro.observe(this.popperTarget);
      ro.observe(this.reference);
    }
  }, {
    key: "clicker",
    value: function clicker(event, popperTarget, reference) {
      if (SIDEBAR_EL.classList.contains("collapsed") && !popperTarget.contains(event.target) && !reference.contains(event.target)) {
        this.hide();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.instance.state.elements.popper.style.visibility = "hidden";
    }
  }]);
  return PopperObject;
}();

var Poppers = /*#__PURE__*/function () {
  function Poppers() {
    (0, _classCallCheck2["default"])(this, Poppers);

    _defineProperty(this, "subMenuPoppers", []);

    this.init();
  }

  (0, _createClass2["default"])(Poppers, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      SUB_MENU_ELS.forEach(function (element) {
        _this2.subMenuPoppers.push(new PopperObject(element, element.lastElementChild));

        _this2.closePoppers();
      });
    }
  }, {
    key: "togglePopper",
    value: function togglePopper(target) {
      if (window.getComputedStyle(target).visibility === "hidden") target.style.visibility = "visible";else target.style.visibility = "hidden";
    }
  }, {
    key: "updatePoppers",
    value: function updatePoppers() {
      this.subMenuPoppers.forEach(function (element) {
        element.instance.state.elements.popper.style.display = "none";
        element.instance.update();
      });
    }
  }, {
    key: "closePoppers",
    value: function closePoppers() {
      this.subMenuPoppers.forEach(function (element) {
        element.hide();
      });
    }
  }]);
  return Poppers;
}();

var slideUp = function slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ANIMATION_DURATION;
  var parentElement = target.parentElement;
  parentElement.classList.remove("open");
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = "".concat(duration, "ms");
  target.style.boxSizing = "border-box";
  target.style.height = "".concat(target.offsetHeight, "px");
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(function () {
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

var slideDown = function slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ANIMATION_DURATION;
  var parentElement = target.parentElement;
  parentElement.classList.add("open");
  target.style.removeProperty("display");

  var _window$getComputedSt = window.getComputedStyle(target),
      display = _window$getComputedSt.display;

  if (display === "none") display = "block";
  target.style.display = display;
  var height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = "".concat(duration, "ms");
  target.style.height = "".concat(height, "px");
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(function () {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

var slideToggle = function slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ANIMATION_DURATION;
  if (window.getComputedStyle(target).display === "none") return slideDown(target, duration);
  return slideUp(target, duration);
};

var PoppersInstance = new Poppers();
/**
 * wait for the current animation to finish and update poppers position
 */

var updatePoppersTimeout = function updatePoppersTimeout() {
  setTimeout(function () {
    PoppersInstance.updatePoppers();
  }, ANIMATION_DURATION);
};
/**
 * sidebar collapse handler
 */


document.getElementById("btn-collapse").addEventListener("click", function () {
  SIDEBAR_EL.classList.toggle("collapsed");
  PoppersInstance.closePoppers();
  if (SIDEBAR_EL.classList.contains("collapsed")) FIRST_SUB_MENUS_BTN.forEach(function (element) {
    element.parentElement.classList.remove("open");
  });
  updatePoppersTimeout();
});
/**
 * sidebar toggle handler (on break point )
 */

document.getElementById("btn-toggle").addEventListener("click", function () {
  SIDEBAR_EL.classList.toggle("toggled");
  updatePoppersTimeout();
});
/**
 * toggle sidebar on overlay click
 */

document.getElementById("overlay").addEventListener("click", function () {
  SIDEBAR_EL.classList.toggle("toggled");
});
var defaultOpenMenus = document.querySelectorAll(".menu-item.sub-menu.open");
defaultOpenMenus.forEach(function (element) {
  element.lastElementChild.style.display = "block";
});
/**
 * handle top level submenu click
 */

FIRST_SUB_MENUS_BTN.forEach(function (element) {
  element.addEventListener("click", function () {
    if (SIDEBAR_EL.classList.contains("collapsed")) PoppersInstance.togglePopper(element.nextElementSibling);else {
      var parentMenu = element.closest(".menu.open-current-submenu");
      if (parentMenu) parentMenu.querySelectorAll(":scope > ul > .menu-item.sub-menu > a").forEach(function (el) {
        return window.getComputedStyle(el.nextElementSibling).display !== "none" && slideUp(el.nextElementSibling);
      });
      slideToggle(element.nextElementSibling);
    }
  });
});
/**
 * handle inner submenu click
 */

INNER_SUB_MENUS_BTN.forEach(function (element) {
  element.addEventListener("click", function () {
    slideToggle(element.nextElementSibling);
  });
});
/*FORM *--------------------------*/

var getState = function getState() {
  var $ = function $(element) {
    return document.getElementById(element).value;
  };

  var state = {
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
  };
  return state;
};

var buildResume = function buildResume(state) {
  var $ = function $(value) {
    document.write(value);
  };

  var styleText = "\n@import url('https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap');\n\nbody {\n  font-family: 'Poppins', sans-serif;\n  background: #fafafa;\n  color: rgba(0,0,0,0.75);\n}\n\nh1 {\n  color: rgba(0,0,0,0.9);\n}\n\nh1, p {\n  box-sizing: border-box;\n  margin: 0px;\n  padding: 0px 24px;\n}\n\n.line-break {\n  width: 100%;\n  height: 1px;\n  margin: 16px auto;\n  border-bottom: 1px solid #eee;\n}\n\n.resume {\n  border-radius: 8px;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  max-width: 800px;\n  margin: 48px auto;\n  padding: 16px 0px;\n  background: white;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.14);\n}\n\n.resume-group {\n  box-sizing: border-box;\n  padding: 8px 0px;\n  width: 100%;\n  display: flex;\n  border-left: 3px solid transparent;\n  transition: 0.2s;\n}\n\n.resume-group:hover {\n  border-left: 3px solid #64FFDA;\n}\n\n.left-col {\n  width: 35%;\n}\n\n.right-col {\n  width: 65%;\n}\n\n.instructions {\n  opacity: 0.5;\n  text-align: center;\n  font-size: 0.8rem;\n  margin: 16px auto;\n}\n";

  var createGroup = function createGroup(left, right) {
    $('<div class="resume-group">');
    $('<div class="left-col">');
    $('<p>' + left + '</p>');
    $('</div>');
    $('<div class="right-col">');
    $('<p>' + right + '</p>');
    $('</div>');
    $('</div>');
  };

  document.open();
  $('<html><head>');
  $('<title>' + state.name + "'s Resume </title>");
  $('<style>' + styleText + '</style>');
  $('</head><body><div class="resume">');
  $('<h1>' + state.name + '</h1>');
  $('<p>' + state.email + '</p>');
  $('<p>' + state.phone + '</p>');
  $('<p>' + state.address + '</p>');
  $('<div class="line-break"></div>');
  createGroup('ABOUT ME', state.about);
  createGroup("CAREER OBJECTIVES", state.career);
  createGroup('EDUCATION', state.education);
  createGroup('EMPLOYMENT EXPERIENCE', '');
  createGroup(state.job1.date.start + ' to ' + state.job1.date.end, state.job1.details);
  createGroup(state.job2.date.start + ' to ' + state.job2.date.end, state.job2.details);
  createGroup(state.job3.date.start + ' to ' + state.job3.date.end, state.job3.details);
  createGroup('REFERENCES', state.references);
  $('</div>');
  $('<div class="instructions">Right click the page and "Save As..." to make a copy of this resume</div>');
  $('</body></html>');
  document.close();
};

var checkName = function checkName() {
  var name = document.getElementById('name');
  var name_error = document.getElementById('name__error');
  var isValid = !!name.value;

  if (!isValid) {
    name.classList.add("error__input");
    name_error.style.display = "block";
    name_error.innerHTML = " Este campo es un campo requerido";
    console.log("error");
  } else {
    name.classList.remove("error__input");
    name_error.style.display = "none";
  }

  return isValid;
};

var checkEmail = function checkEmail() {
  var email = document.getElementById('email');
  var email_error = document.getElementById('email__error');
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = emailRegex.test(String(email.value).toLowerCase());

  if (!email.value) {
    email.classList.add("error__input");
    email_error.style.display = "block";
    email_error.innerHTML = " Este campo es un campo requerido";
  } else {
    if (!isValid) {
      email.classList.add("error__input");
      email_error.style.display = "block";
      email_error.innerHTML = " Este campo es un invalido";
    } else {
      email.classList.remove("error__input");
      email_error.style.display = "none";
    }
  }

  return isValid;
};

var checkValidity = function checkValidity() {
  var nameIsValid = checkName();
  var emailIsValid = checkEmail();

  if (!nameIsValid) {
    location.hash = "#name";
  } else if (!emailIsValid) {
    location.hash = "#email";
  }

  return nameIsValid && emailIsValid;
};

document.getElementById('create-resume').addEventListener("click", function (e) {
  e.preventDefault();
  var isValid = checkValidity();
  if (isValid) buildResume(getState());
});
document.getElementById('name').addEventListener('blur', checkName);
document.getElementById('email').addEventListener('blur', checkEmail);