document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz");
  const submitBtn = document.getElementById("submitBtn");
  let currentQuestion = 0;
  let score = 0;

  // Fetch and parse the JSON data
  let topic = document.getElementById("topic").innerHTML;
  fetch("data/" + topic + ".json")
    .then((response) => response.json())
    .then((data) => {
      const questions = data;

      // Function to load a question
      function loadQuestion() {
        const questionData = questions[currentQuestion];
        quizContainer.innerHTML = `
                    <h3>${questionData.question}</h3>
                    <ul>
                        ${questionData.options
                          .map(
                            (option, index) => `
                                    <li>
                                        <input type="radio" name="answer" value="${option}" id="option${index}">
                                        <label for="option${index}">${option}</label>
                                    </li>
                                `
                          )
                          .join("")}
                    </ul>
                `;
      }

      loadQuestion();

      // Function to check the answer
      function checkAnswer() {
        const selectedOption = document.querySelector(
          'input[name="answer"]:checked'
        );
        if (!selectedOption) return;

        if (selectedOption.value === questions[currentQuestion].correctAnswer) {
          score++;
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
          loadQuestion();
        } else {
          // Display the score when all questions are answered
          quizContainer.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
          submitBtn.style.display = "none";
        }
      }

      // Event listener for the Submit button
      submitBtn.addEventListener("click", checkAnswer);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
