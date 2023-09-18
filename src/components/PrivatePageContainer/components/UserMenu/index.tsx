import { FC } from 'react'
import { useRouter } from 'next/navigation'
import MenuButton from '@mui/joy/MenuButton'
import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'
import Dropdown from '@mui/joy/Dropdown'
// Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ProfileIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import UserIcon from '@mui/icons-material/Person'

const MENU_ICONS_STYLES = { fontSize: 18, mr: 1 }

interface UserMenuProps {
  userName: string
}
export const UserMenu: FC<UserMenuProps> = ({ userName }) => {
  const router = useRouter()

  return (
    <Dropdown>
      <div className='relative'>
        <MenuButton startDecorator={<UserIcon />} endDecorator={<ArrowDropDownIcon />}>
          {userName}
        </MenuButton>
        <Menu sx={{ minWidth: 140 }} popperOptions={{ placement: 'top-end' }}>
          <MenuItem onClick={() => router.push('/profile')}>
            <div className='text-sm flex items-center'>
              <ProfileIcon sx={MENU_ICONS_STYLES} /> Profile
            </div>
          </MenuItem>
          <MenuItem onClick={() => router.push('/logout')}>
            <div className='text-sm flex items-center'>
              <LogoutIcon sx={MENU_ICONS_STYLES} /> Logout
            </div>
          </MenuItem>
        </Menu>
      </div>
    </Dropdown>
  );
}
