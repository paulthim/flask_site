import React, { Component } from 'react';
import { Card, CardBody, CardText, Media, Tooltip} from 'reactstrap';

import { ToolTipText } from './Widgets';

const BIRTHDATESTRING = '1985-04-11T01:30:00';

class Contact extends Component {
  constructor(props, context) {
    super(props, context);
    this.getAge = this.getAge.bind(this);
  }

  getAge() {
    var today = new Date();
    var birthDate = new Date(BIRTHDATESTRING);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  render() {
    const age = this.getAge();
    return (
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-sm-2">
            <div>
              <img src="dist/images/IMG_3332.png" alt="Awkward selfie" class="figure-img img-fluid img-thumbnail" />
              <p class="text-muted">I'm older than I should be, but younger than I seem.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <p class="h3 text-right border-bottom">In Short</p>
            <p class="body-lead">
A {age}-year-old working towards a second career. <span class="text-muted">And
since I'd like that to involve software, this site is going to serve both as
practice and, eventually, portfolio.</span>
            </p>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <div class="col-sm-8">
            <p class="h4 text-right text-muted border-bottom">In A Few More Words</p>
            <p class="body-p">
A couple of years ago I took a left turn out of social work/bartending/retail
into software and <span id="ImmediateTT"><b>immediately</b></span> found myself
stuck. Stuck might be the wrong word. Lost, maybe?
            </p>
            <p class="body-p">
It wasn't that I was struggling to learn how to read and
write code. Reading and writing is (oversimplifying a little), the <span id="EasyTT"><b>easy part</b></span>.
I'd expected the road ahead to be rocky and at times even winding. I was even
bracing myself for that terrible moment when I might became trapped in <span id="GridlockTT"><b>gridlock</b></span>.
            </p>
            <p class="body-p">
What I eventually learned is that a left turn into software doesn't point you
in the direction of hard-earned success. Instead, it steers you onto a
roundabout with a few thousand unmarked exits. As it turns out, "software" is an
insanely broad category.
            </p>
            <ToolTipText target="EasyTT">Understanding what you've written is, at best, only marginally more difficult.</ToolTipText>
            <ToolTipText target="GridlockTT">Not sure what gridlock is in this metaphor. Unemployment, maybe? Or bad management?</ToolTipText>
            <ToolTipText target="ImmediateTT">OK, so not immediately. I mean, there's been school. And work. And Minecraft.</ToolTipText>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <div class="col-sm-8">
          <p class="h4 text-right text-muted border-bottom">In PDF Format</p>
            <div class="row ">
              <div class="col-sm-6 body-link-col text-right">
                <a class="body-link" href="downloads/Paul_Thim_Resume.pdf" rel="noopener noreferrer" target="_top">Resume: The Nice One</a>
              </div>
              <div class="col-sm-6 body-link-col text-left">
                <a class="body-link" href="downloads/Paul_Thim_Resume_Simple.pdf" rel="noopener noreferrer" target="_top">Resume: The Simple One</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <div class="col-sm-6">
            <p class="h4 text-right text-muted border-bottom">So Here We Are</p>
            <p class="body-p">
This website is both a working resume and an exercise in web development. I'm planning to post exercises and coursework that I complete as well as projects that I take on (and am allowed to share).
            </p>
          </div>
          <div class="col-sm-2 border-left">
            <p class="body-list-p">Design Philosophy:</p>
            <ul>
              <li>Make A Website</li>
              <li>Learn How to Make A Website</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
