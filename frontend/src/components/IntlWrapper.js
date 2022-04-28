import React, {useState} from 'react';
import { IntlProvider } from 'react-intl';
import translations from "../translations"

export const Context = React.createContext();

const language = navigator.language.split(/[-_]/)[0];
const DEFAULT_LOCALE = "es"

let langMessages = translations[DEFAULT_LOCALE];
let langLocale = DEFAULT_LOCALE;
if (translations[language]) {
    langMessages = translations[language];
    langLocale = language
}

const IntlWrapper = (props) => {
   const [locale, setLocale] = useState(langLocale);
   const [messages, setMessages] = useState(langMessages);

   function selectLanguage(e) {
       const newLocale = e;
       setLocale(newLocale);
       setMessages(translations[newLocale]);
   }
   return (
       <Context.Provider value ={{locale, selectLanguage}}>
           <IntlProvider messages={messages} locale={locale} defaultLocale={DEFAULT_LOCALE}>
               {props.children}
           </IntlProvider>
       </Context.Provider>

   );
}

export default IntlWrapper;