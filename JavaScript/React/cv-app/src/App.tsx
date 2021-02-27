import React from 'react';
import './App.css';

import SideNav from './components/SideNav';
import GenInfo from './components/GenInfo';
import GenInfoPreview from './components/GenInfoPreview';
import EducationInfo from './components/EducationInfo';
import ProfessionalInfo from './components/ProfessionalInfo';
import EducationInfoPreview from './components/EducationInfoPreview';
import ProfessionalInfoPreview from './components/ProfessionalInfoPreview';
import SkillInfo from './components/SkillInfo';

import {globalState, sections, genInfoType, educationType, profType, skillGroup} from './types';
import Preview from './components/Preview';

type propType = {};
class App extends React.Component<propType, globalState> {
  constructor(props: propType) {
    super(props);
    this.state = {
      section: sections.General,
      general: { name:'', email: '', phone:'' },
      education: [],
      profession: [],
      skills: [],
    };
    this.handleGeneralFormSubmit = this.handleGeneralFormSubmit.bind(this);
    this.handleEducationFormSubmit = this.handleEducationFormSubmit.bind(this);
    this.handleProfessionalFormSubmit = this.handleProfessionalFormSubmit.bind(this);
    this.handleSkillGroupAdd = this.handleSkillGroupAdd.bind(this);
    this.switchSidebarTab = this.switchSidebarTab.bind(this);
    this.handleSkillAdd = this.handleSkillAdd.bind(this);
  }

  switchSidebarTab(tabIndex: number) {
    if (this.state.section === tabIndex) return;
    if (!sections[tabIndex]) return;
    this.setState({ section: tabIndex });
  }

  handleGeneralFormSubmit(payload: genInfoType) {
    this.setState({general: payload});
  }

  handleEducationFormSubmit(payload: educationType) {
    this.setState({
      education: [...this.state.education, payload],
    });
  }

  handleProfessionalFormSubmit(payload: profType) {
    this.setState({
      profession: [...this.state.profession, payload],
    });
  }

  handleSkillGroupAdd(payload: skillGroup) {
    payload.id = this.state.skills.length + 1;
    this.setState({
      skills: [...this.state.skills, payload]
    });
  }

  handleSkillAdd(skillGroup: skillGroup, skillName: string) {
    const otherSkillsBefore = this.state.skills.filter(s => s.id < skillGroup.id);
    const otherSkillsAfter = this.state.skills.filter(s => s.id > skillGroup.id);
    let changedSkill = this.state.skills.filter(s => s.id === skillGroup.id)[0];
    changedSkill.skills.push({id: changedSkill.skills.length + 1, name: skillName});

    this.setState({
      skills: [...otherSkillsBefore, changedSkill, ...otherSkillsAfter]
    });
  }

  render() {
    const { section } = this.state;
    return (
      <div className="App">
        <div>
          <h3 className="heading" style={{marginLeft: '0.5rem'}}>CV Builder</h3>
          <div className="sidebar">
            <SideNav text='General' cb={() => this.switchSidebarTab(sections.General)} active={section === sections.General} />
            <SideNav text='Education' cb={() => this.switchSidebarTab(sections.Education)} active={section === sections.Education} />
            <SideNav text='Professional' cb={() => this.switchSidebarTab(sections.Professional)} active={section === sections.Professional} />
            <SideNav text='Skills' cb={() => this.switchSidebarTab(sections.Skills)} active={section === sections.Skills} />
            <SideNav text='Preview' cb={() => this.switchSidebarTab(sections.Preview)} active={section === sections.Preview} />
          </div>
        </div>
        {
          section === sections.General &&
          <div className="main">
            <GenInfo info={this.state.general} cb={this.handleGeneralFormSubmit} />
            <GenInfoPreview info={this.state.general} />
          </div>
        }
        {
          section === sections.Education &&
          <div className="main">
            <EducationInfo info={this.state.education} cb={this.handleEducationFormSubmit} />
            <EducationInfoPreview info={this.state.education} />
          </div>
        }
        {
          section === sections.Professional &&
          <div className="main">
            <ProfessionalInfo info={this.state.profession} cb={this.handleProfessionalFormSubmit} />
            <ProfessionalInfoPreview info={this.state.profession} />
          </div>
        }
        {
          section === sections.Skills &&
          <div className="main">
            <SkillInfo info={this.state.skills} addGroup={this.handleSkillGroupAdd} 
              addSkill={this.handleSkillAdd}/>
          </div>
        }
        {
          section === sections.Preview &&
          <Preview info={this.state}/>
        }
      </div>
    );
  }
}

export default App;
