import React from 'react';
import { IResult } from '../../@types/common';

interface IProps {
  resultsList: IResult[];
}

const ResultList: React.FC<IProps> = ({ resultsList }) => {
  return (
    <div className="boxes results-container">
      {resultsList.map((item) => {
        const status =
          item.armenianTranslation?.russianId === item.russianTranslation?.id
            ? 'success'
            : 'failure';

        return (
          <div
            id={item.armenianTranslation?.id}
            key={item.armenianTranslation?.id}
            className={`box-container ${status}`}
          >
            <div className="box">{item.armenianTranslation?.text}</div>
            <div className="box">{item.russianTranslation?.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultList;
