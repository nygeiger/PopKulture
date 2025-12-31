export async function fetchQuestions() {
    try {
    const scriptURL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhuCfuqNe9ds_jcIVYaaGJyu9TcnWggd5bO7wUOLBEMovBDk7h6HrP4Agm04EkB_qASJs0BN9ywNJP1ewBY0TWSKBIzwmyWDRPAh4Jy1N9upJnC72McCjSYhnMDue6x1Ti8jG7ErKqt2FJAfr7ss4ikIkHqjtqNM_l6Jd9drPEwlzXfgtjSP0eq5w3gNVYD7EY5a3C6ZgOHfzLPxGXxO8yHIQe4mbdBtUrGEk3L2zxXO1qlI_KB2b-Nst0j8e4Es55dSIZs2HCpCo2O5E6PepB0ZgTUS24os2rlHOAS&lib=MOREmwRQm_u0vz3m12ZDLB_DBJqwUl4zN";
    const tempVari = await fetch(scriptURL)
    console.log(await tempVari.text());
    } catch (e) {
        console.log("!! Error on fetch questions !!!");
        console.log(e);
    }
}