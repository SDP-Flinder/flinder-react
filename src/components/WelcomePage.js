import React from 'react';
import Button from '@material-ui/core/Button';
import { useTwitterBtnStyles } from '@mui-treasury/styles/button/twitter';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';

const WelcomePage = (props) => {
  const styles = useTwitterBtnStyles();
  const mainStyles = usePushingGutterStyles({
    cssProp: 'marginTop',
    space: 2,
  });
  const wrapperStyles = usePushingGutterStyles();
  return (
    <div className={mainStyles.parent}>
      <p>This is just a draft sign in page to access to the sign up feature</p>
      <div className={wrapperStyles.parent}>
        <Button
          classes={styles}
          color={'primary'}
          variant={'contained'}
          size={'large'}
        >
          Sign In
        </Button>
      </div>
      <div className={wrapperStyles.parent}>
        <Button classes={styles} variant={'outlined'} color={'primary'}
        onClick = { () => {
            props.history.push('/sign-up/')
        }
        }>
          Create an account
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;