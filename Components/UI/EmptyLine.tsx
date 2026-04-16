import { Text } from 'react-native';


export function EmptyLine( { size = 'small' }: { size?: 'small' | 'medium' | 'large' }) {
    if (size === 'small') 
      return (
                <Text ></Text>
      );
    else if (size === 'medium')
      return (
              <>
                <Text ></Text>
              </>
      );
    else
      return (
              <>
                <Text ></Text>
                <Text ></Text>
              </>
      );
}
