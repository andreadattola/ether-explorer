import { Text, TextLink } from '@/components/Text';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import styles from './Footer.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <Text color="accents-7">
          Made by {' '}
          <TextLink href="https://www.linkedin.com/in/andrea-dattola-920ba51a6/" color="link">
           Andrea Dattola -  uniPI
          </TextLink>
          .
        </Text>
        <Spacer size={1} axis="vertical" />
      </Wrapper>
    </footer>
  );
};

export default Footer;
