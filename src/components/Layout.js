import React, { Component } from 'react'
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang, getSlugAndLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import { rhythm } from "../utils/typography"
import 'intl';

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import it from 'react-intl/locale-data/it';
import 'intl/locale-data/jsonp/it';
import './all.sass'
import 'font-awesome/css/font-awesome.css'

import articleId from '../data/articleTree'

const getIdUrl = (id, langKey) => {
  if(id){
  console.log("inside the Id getter");
  var res;
  switch (langKey) {
    //we get the name of the page according the id
    case 'en':
    res = articleId[id][0];
    break;
    case 'it':
    res = articleId[id][1];
    break;
    default: return null;
  }
  console.log("res is:");
  console.log(res);
  return res;
}
};

const startPath = (langKey, langsMenu, basename, _url) => {
  const lengthLangKey = langKey.length;
  var indx;
  indx = _url.indexOf(basename);
  const basePath = _url.slice(lengthLangKey + 2, indx);
  return basePath;
};


const setLangsMenu = ( langsMenu, id, basePath) => {
  if(id){
  console.log("inside the setter");
  langsMenu[0].link = `/en/${basePath}` + getIdUrl(id, 'en');
  langsMenu[1].link = `/it/${basePath}` + getIdUrl(id, 'it');
}
};

// add concatenated locale data
addLocaleData([...en, ...it]);

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    const data = this.props.data;
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));
    const id_article = data.markdownRemark.frontmatter.id;
    console.log(id_article);
    const basename = getIdUrl(id_article, this.langKey);
    const indx = this.langsMenu[0].link.indexOf(basename);
    const lengthLangKey = this.langKey.length;
    console.log("length of the langKey:");
    console.log(lengthLangKey);
    console.log("start index:");
    console.log(indx);
    console.log("basename:");
    console.log(basename);
    const basePath = url.slice(lengthLangKey + 2, indx);
    console.log("basePath is:");
    console.log(basePath);
    var Path = startPath(this.langKey, this.langsMenu, basename, url);
    console.log("path is:");
    console.log(Path);

    setLangsMenu( this.langsMenu, id_article, Path);

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    this.i18nMessages = require(`../data/messages/${this.langKey}`);
  }
  render() {
    return (
      <IntlProvider
        locale={this.langKey}
        messages={this.i18nMessages}
      >
        <div>
          <Helmet
            title="Gatsby Default Starter"
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          />
          <Header langKey={this.langKey} langs={this.langsMenu} />
          <div>
            {this.children}
          </div>
          <Footer langKey={this.langKey}/>
        </div>
      </IntlProvider>
    );
  }
}

export default TemplateWrapper
