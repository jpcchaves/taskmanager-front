import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Icon,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { NavItem } from '../types/NavItemI';

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<RouteLink to={href!} role={'group'}>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'blue.400' }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}
				>
					<Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</RouteLink>
	);
};

export default DesktopSubNav;
