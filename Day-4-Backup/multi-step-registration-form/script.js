initMultiStepForm();

function initMultiStepForm() {
    const progressNumber = document.querySelectorAll(".step").length;
    const slidePage = document.querySelector(".slide-page");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const spinner = document.getElementById("spinner");
    
    const stepsNumber = pages.length;

    const $form = document.getElementById('loginForm');
    const formData = {};

    if (progressNumber !== stepsNumber) {
        console.warn(
            "Error, number of steps in progress bar do not match number of pages"
        );
    }

    document.documentElement.style.setProperty("--stepNumber", stepsNumber);

    let current = 1;

    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener("click", function (event) {
            event.preventDefault();

            inputsValid = validateInputs(this);
            // inputsValid = true;

            if (inputsValid) {
                slidePage.style.marginLeft = `-${
                    (100 / stepsNumber) * current
                }%`;
                bullet[current - 1].classList.add("active");
                progressCheck[current - 1].classList.add("active");
                progressText[current - 1].classList.add("active");
                current += 1;
            }
        });
    }

    for (let i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener("click", function (event) {
            event.preventDefault();
            slidePage.style.marginLeft = `-${
                (100 / stepsNumber) * (current - 2)
            }%`;
            bullet[current - 2].classList.remove("active");
            progressCheck[current - 2].classList.remove("active");
            progressText[current - 2].classList.remove("active");
            current -= 1;
        });
    }
    submitBtn.addEventListener("click", function () {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
        submitBtn.disabled = true;
        submitBtn.style.background = "grey";
        spinner.removeAttribute("hidden");
        setTimeout(function () {
            alert("Your Form Successfully Signed up");
            spinner.setAttribute("hidden",true);
            submitBtn.disabled = false;
            location.reload();
        }, 5000);

        //SAVE DATA TO LOCAL STORAGE

       console.log($form);

        for (let i = 0; i < $form.elements.length; i++) {
            const element = $form.elements[i];

            if (element.name) {
                formData[element.name] = element.value;
            }
        }
        let bodyFormJson = JSON.stringify(formData);

        localStorage.setItem('formData', bodyFormJson);

        //SAVE DATA TO JSON SERVER
        const url = "http://localhost:3000/data";

        const options = {
            method: 'POST', // or 'PUT', 'DELETE'
            headers: {
                'Content-Type': 'application/json'
                // Add any other headers here
            },
            body: bodyFormJson
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(responseData => {
                // Process the response data
                console.log(responseData);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });

    function validateInputs(ths) {
        let inputsValid = true;

        const inputs =
            ths.parentElement.parentElement.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
            const valid = inputs[i].checkValidity();
            if (!valid) {
                inputsValid = false;
                inputs[i].classList.add("invalid-input");
            } else {
                inputs[i].classList.remove("invalid-input");
            }
        }
        return inputsValid;
    }
    //extract the input elements, and save them to localstorage
}
