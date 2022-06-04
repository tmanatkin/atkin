// Navbar Show on Scroll
window.onscroll = function () {
  if (document.documentElement.scrollTop == 0) {
    // ||(document.documentElement.scrollTop == 1596)||(document.documentElement.scrollTop == 3194)
    document.getElementById("navBar").style.backgroundColor =
      "rgb(33, 33, 33, 0)";
  } else {
    document.getElementById("navBar").style.backgroundColor =
      "rgb(33, 33, 33, 1)";
  }
};

// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    // Remove All Active Classes
    // var allElements = document.querySelectorAll(".active");
    // for (let i=0; i < allElements.length; i++) {
    //   allElements[i].classList.remove('active');
    // }

    // Set Current Section to Active
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}