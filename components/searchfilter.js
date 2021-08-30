import React from 'react';
import { useRecoilState, atom, useRecoilValue } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export const searchScopeState = atom({
  key: "searchScopeState",
  default: {
    title: true,
    description: false,
    tag: false,
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function SearchFilter() {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');
  const [state, setState] = useRecoilState(searchScopeState);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange2 = (event) => {
    setValue(event.target.value);
  };

  const { title, description, tag } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">検索範囲</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={title} onChange={handleChange} name="title" />}
            label="タイトル"
          />
          <FormControlLabel
            control={<Checkbox checked={description} onChange={handleChange} name="description" />}
            label="概要欄"
          />
          <FormControlLabel
            control={<Checkbox checked={tag} onChange={handleChange} name="tag" />}
            label="タグ"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">並べ替え</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange2}>
          <FormControlLabel value="female" control={<Radio />} label="公開日(降順)" />
          <FormControlLabel value="male" control={<Radio />} label="視聴回数(降順)" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
    </FormControl>
    </div>
  );
}