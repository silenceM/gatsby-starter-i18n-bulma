import React from 'react'
import Helmet from 'react-helmet'
import * as Amp from 'react-amphtml';
//import { AmpStory } from 'react-amphtml/setup';
import { AmpScripts, AmpScriptsManager, headerBoilerplate } from 'react-amphtml/setup';

const AmpH = class extends React.Component {

  render(){
    const ampScripts = new AmpScripts();
    const ampScriptTags = ampScripts.getScriptElements();
    const title = 'ampreact';
    return(
    <Helmet
    key="app-head"
    defaultTitle={title}
    titleTemplate={`%s | ${title}`}>
  <Amp.Html specName="html ⚡ for top-level html" lang="en">
  <html amp>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
      {title}
      {ampScriptTags}
    </html>
  </Amp.Html>
  </Helmet>

);
}
}

export default AmpH
