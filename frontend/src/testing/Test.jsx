import React from "react";
import SteamGame from "./SteamGame";
import BBDDlg from "./BBDDlg";
import BBDDmg from "./BBDDmg";
import BBDDlogin from "./BBDDlogin";
import BBDDsignin from "./BBDDsignin";
import BBDDdeleteUser from "./BBDDdeleteUser";
import BBDDsavegame from "./BBDDsavegame";
import CheapsharkID from "./CheapsharkID";
import Cheapshark from "./Cheapshark";
import Epicgames from "./Epicgames";

function Test() {
  return (
    <div className="test-page">
      <h1>Pruebas de Integración</h1>
      <div className="test-components">
        <SteamGame />
        <BBDDlg />
        <BBDDmg />
        <BBDDsavegame />
		<BBDDsignin />
		<BBDDlogin />
		<BBDDdeleteUser />
		<CheapsharkID />
        <Cheapshark />
		<Epicgames />
      </div>
      <style jsx>{`
        .test-page {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .test-components {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

export default Test;