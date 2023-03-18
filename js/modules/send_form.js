const sendForm = () => {
    const form = document.querySelector(".form");

    form.addEventListener("submit", formSend);
    // console.log(form.action);

    // async function formSend(e) {
    //     const formData = new FormData(loginForm);
    //     let error = formValidate();

    //     e.preventDefault();

    //     if (error === 0) {
    //         let response = await fetch("sendmail.php", {
    //             method: "POST",
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             let result = await response.json();
    //             alert(result.message);
    //             loginForm.reset();
    //         } else {
    //             alert("ERROR");
    //         }
    //     }
    // }

    function formSend(e) {
        console.log("asdsd");
        let error = formValidate();

        // e.preventDefault();

        if (error === 0) {
            form.action = "https://formspree.io/f/anatolii.s.tkach@gmail.com";
        }
    }

    function formValidate() {
        const formReq = document.querySelectorAll("._req");
        let error = 0;

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];

            formRemoveError(input);

            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                    alert("check your email");
                }
            } else if (input.value.length < 6) {
                formAddError(input);
                error++;
                alert("must be more than six characters");
            }
        }

        return error;
    }

    const formAddError = (input) => {
        input.classList.add("_error");
    };

    const formRemoveError = (input) => {
        input.classList.remove("_error");
    };

    const emailTest = (input) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
};

export default sendForm;
