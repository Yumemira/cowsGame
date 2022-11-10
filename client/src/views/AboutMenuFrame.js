import React from "react";
import "./AboutMenuStyle.css";
import MainMenuElements from "./MainMenuFrame";
import PostConstructor from "./components/postsConstructor";
export default class AboutMenu extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render(){
    let text = [3];
    text[0] = `Внимание! На планету вторглись инопланетяне и захватили материк!
    Розыскиваются воины, способные победить злых захватчиков и принести покой в земли Рейндилии!
    Самым храбрым воинам будет выдана щедрая награда!
    Акция действует до конца сражения!
    Если вы успешно расчистите планету от инопланетян,
    лучшие в рейтинге получат вознаграждение 1000 руб за 1 место,
    и 500 рублей за 2 место, 200 рублей за 2-9 места и 100 рублей за 10ое!
    Торопитесь присоединиться к сражению!!
    Но знайте, выплата будет проведена только при полной победе над захватчиками!`;

    text[1] = `Необходимо создать профиль, кланы, подземелья, уникальные предметы и несколько способностей мифического ранга. Так же реализовать обучаемый ИИ, сбор статистики для научного исследования, магазин привилегий, вип статус и др.`;

    text[2] = `Этот сайт - научная работа студента Эглит Д.А. 3го курса ДГТУ(филиал) г.Волгодонска. Регистрируясь на данном сайте вы принимаете условия Пользовательского соглашения
    (комментарий автора - сбор персональных данных - в первую очередь собирается анонимная статистика, которая используется в проводимом мною исследовании, исключение составляют данные о поле, возрасте и иная информация, которая используется для показа рекламы(никакие ваши данные, тем не менее не будут переданы рекламодателю, кроме как анонимно
    Проще говоря, для рекламодателя я буду выдавать статистику в целом(например:70% посетителей сайта - мужчины) при этом мы не храним персональные данные в персонализированном типе: имя, фамилия, возраст, пол, логин, пароль)
    Только в общей статистике(что обеспечивает безопасность для лично вашей информации))
    Все права защищены, любое копирование, попытка взлома а так же читерства будет пресекаться(ведите себя прилично, пожалуйста, мы ведь все люди)`;

    let elems = MainMenuElements();
    elems[1] = (
        <main className="about--main">
          <PostConstructor idPost='1' titleName="Конкурс!" postHashTags="#cash" textData={text[0]} textAuthor={"Admin"}/>
          <PostConstructor idPost='2' titleName="Ближайшие перспективы" postHashTags="#soon" textData={text[1]} textAuthor={"Admin"}/>
          <PostConstructor idPost='3' titleName="О проекте" postHashTags="#about" textData={text[2]} textAuthor={"Admin"}/>
          <PostConstructor idPost='4' titleName="О проекте" postHashTags="#about" textData={text[2]} textAuthor={"Admin"}/>
          <PostConstructor idPost='5' titleName="О проекте" postHashTags="#about" textData={text[2]} textAuthor={"Admin"}/>
          <PostConstructor idPost='6' titleName="О проекте" postHashTags="#about" textData={text[2]} textAuthor={"Admin"}/>
        </main>
      );

    return elems;
  }
}