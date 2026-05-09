"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { signOut, useSession } from "./lib/auth_client";
import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  const currentPath = usePathname();

  return (
    <nav className="border-b px-5 mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks currentPath={currentPath} />
          </Flex>
          <AuthStatus currentPath={currentPath} />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = ({ currentPath }: { currentPath: string }) => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "text-zinc-900!": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = ({ currentPath }: { currentPath: string }) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(currentPath);
  };

  if (isPending) return <Skeleton width="3rem" />;

  if (!session)
    return (
      <Link className="nav-link" href={`/signin?callbackURL=${currentPath}`}>
        Sign In
      </Link>
    );

  return (
    <Box>
      <AlertDialog.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost" className="p-0! border-0">
              <Avatar
                src={session.user.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
              />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <AlertDialog.Trigger>
              <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
            </AlertDialog.Trigger>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <AlertDialog.Content maxWidth="400px">
          <AlertDialog.Title>Sign Out</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to sign out?
          </AlertDialog.Description>
          <Flex gap="3" justify="end" mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleSignOut}>
                Sign Out
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
};

export default NavBar;
