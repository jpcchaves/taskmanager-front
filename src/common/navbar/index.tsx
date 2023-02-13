import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Collapse,
	Flex,
	IconButton,
	Stack,
	Text,
	useBreakpointValue,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	Image,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';

import Logo from '../../assets/logo.png';
import LogoLight from '../../assets/logo-light.png';
import useHandleNavigate from '../../hooks/useHandleNavigate';

const Navbar = () => {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	const { handleNavigate } = useHandleNavigate();

	return (
		<>
			<Box>
				<Flex
					bg={useColorModeValue('white', 'gray.800')}
					color={useColorModeValue('gray.600', 'white')}
					minH={'60px'}
					py={{ base: 2 }}
					px={{ base: 4 }}
					borderBottom={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.900')}
					align={'center'}
				>
					<Flex
						flex={{ base: 1, md: 'auto' }}
						ml={{ base: -2 }}
						display={{ base: 'flex', md: 'none' }}
					>
						<IconButton
							onClick={onToggle}
							icon={
								isOpen ? (
									<CloseIcon w={3} h={3} />
								) : (
									<HamburgerIcon w={5} h={5} />
								)
							}
							variant={'ghost'}
							aria-label={'Toggle Navigation'}
						/>
					</Flex>
					<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
						<Box
							textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
							fontFamily={'heading'}
							color={useColorModeValue('gray.800', 'white')}
							cursor={'pointer'}
							onClick={() => handleNavigate('/')}
						>
							<Image
								src={colorMode === 'light' ? Logo : LogoLight}
								height={'25px'}
							/>
						</Box>

						<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
							<DesktopNav />
						</Flex>
					</Flex>

					<Stack
						flex={{ base: 1, md: 0 }}
						justify={'flex-end'}
						direction={'row'}
						spacing={6}
					>
						<Button onClick={toggleColorMode}>
							{colorMode === 'light' ? (
								<MoonIcon color={'blue.300'} />
							) : (
								<SunIcon color={'orange.300'} />
							)}
						</Button>
					</Stack>
				</Flex>

				<Collapse in={isOpen} animateOpacity>
					<MobileNav />
				</Collapse>
			</Box>
			<Outlet />
		</>
	);
};

export default Navbar;
