const form =
    document.getElementById(
        "registrationForm"
    );

const message =
    document.getElementById(
        "message"
    );

const button =
    document.getElementById(
        "submitButton"
    );


form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        button.disabled = true;

        button.innerText =
            "Submitting...";


        message.innerText = "";


        const formData =
            new FormData(form);


        try {

            const response =
                await fetch(
                    "/register",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const result =
                await response.json();


            if (result.success) {

                message.innerText =
                    "✅ " +
                    result.message +
                    " Application ID: " +
                    result.applicationId;

                message.style.color =
                    "green";

                form.reset();

            }

            else {

                message.innerText =
                    "❌ " +
                    result.message;

                message.style.color =
                    "red";

            }

        }

        catch (error) {

            console.error(error);

            message.innerText =
                "❌ Server connection failed.";

            message.style.color =
                "red";

        }


        button.disabled = false;

        button.innerText =
            "Submit Application";

    }
);
