import { ConfigProvider } from 'antd';
import './App.css';
import styles from './App.module.less';
import { dataPreprocessing } from './data/data-preprocessing';
import GradesTable from './pages/grades-table';
import TableDemo from './pages/table-demo';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { terms as DataTermTest } from './data/data';
import { useEffect, useState } from 'react';
import { Term } from './interface';

declare const chrome: any;

function App() {
  // get terms from 
  const [terms, setTerms] = useState<Term[]>([]);

  useEffect(() => {
    try {
      chrome.storage.local.get(["tinhDiemIUHTerms"]).then((result: any) => {
        setTerms(result.tinhDiemIUHTerms);
      });
    } catch (e) {
      setTerms(DataTermTest)
    }

  }, [])
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <div className={styles.app}>
        <GradesTable terms={dataPreprocessing(terms)}></GradesTable>
        {/* <GradesTable></GradesTable> */}

      </div>
    </ConfigProvider>
  );
}

export default App;
