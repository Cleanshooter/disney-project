import React, { Dispatch, FC } from 'react';
import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const DeleteButton: FC<{
  onClick: Dispatch<React.MouseEvent<HTMLButtonElement, MouseEvent>>;
}> = ({ onClick }) => {
  //
  //
  return (
    <IconButton onClick={(e) => onClick(e)}>
      <SaveIcon />
    </IconButton>
  );
};

export default DeleteButton;