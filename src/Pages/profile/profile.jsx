import React, { useContext, useState } from 'react';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import { UserContext } from '../../providers/UserProvider';
import { SettingsContext, useSettings } from '../../providers/settingsProvider'
// import { useSettings } from '../../providers/settingsProvider' 
import Commission from '../../components/commission/commission.component'
import { useFirestoreData } from '../calculator';

const Profile = () => {

  const user = useContext(UserContext).user
  const settings = useFirestoreData().settings
  const division = user.division
  const minMargin = parseInt(settings[division].minMargin)
  const share = parseFloat(settings[division].share)
  const [margin, setMargin] = useState(minMargin)

  // const settings = useSettings()
  return (
    <>
      <Navigation />
      Strona profilowa <br/>
      Dywizja:
      {division}
      <br />
      {minMargin}
      <br/>
      {share}

      <div className="mx-auto d-flex flex-column bd-highlight m-3">
      <div className="mx-auto d-flex m-2 ">
        <label className="mx-auto pe-2">Marża</label>
        <input
          type="number"
          value={margin}
          min={minMargin}
          onChange={(e) => setMargin(1 * e.target.value)}
          readOnly
        />
      </div>
      <div className='d-flex justify-content-center'>
        <button
          className="btn btn-outline-warning mx-2 fw-bold"
          onClick={() => margin>minMargin ? setMargin(margin-1) : setMargin(minMargin)}
        >
          odejmij
        </button>
        <button
          className="btn btn-outline-warning mx-2 fw-bold"
          onClick={() => setMargin(margin+1)}
        >
          dodaj
        </button>
      </div>
      </div>

      
      <Commission />
    </>
  );
};
export default Profile;
