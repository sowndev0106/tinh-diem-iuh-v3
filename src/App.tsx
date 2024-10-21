import { ConfigProvider } from 'antd';
import './App.css';
import styles from './App.module.less';
import { grades } from './data/data';
import { dataPreprocessing } from './data/data-preprocessing';
import GradesTable from './pages/grades-table';
import TableDemo from './pages/table-demo';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <div className={styles.app}>
      <GradesTable grades={dataPreprocessing(grades)}></GradesTable>
      {/* <GradesTable></GradesTable> */}

      </div>
    </ConfigProvider>
  );
}

export default App;
