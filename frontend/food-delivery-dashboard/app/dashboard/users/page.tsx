"use client";
import { useState, useEffect } from "react";
import {
  Filter,
  MoreHorizontal,
  Search,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

// Base URL for the Gateway API
const BASE_URL = "http://localhost:3002/api"; // Replace with your Gateway API URL

// Fetch data from the backend with fallback logic
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    // Return fallback mock data in case of network error or backend failure
    return getMockData(endpoint);
  }
};

// Fallback mock data for different endpoints
const getMockData = (endpoint) => {
  switch (endpoint) {
    case "/drivers":
      return [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          isAuthorized: true,
          status: "active",
          joinedAt: "2023-01-15",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1987654321",
          isAuthorized: false,
          status: "pending",
          joinedAt: "2023-02-20",
        },
      ];
    case "/users/all":
      return [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "+1112223333",
          status: "active",
          joinedAt: "2023-01-05",
          orders: 12,
        },
        {
          id: 2,
          name: "Bob Miller",
          email: "bob@example.com",
          phone: "+1444555666",
          status: "active",
          joinedAt: "2023-02-15",
          orders: 5,
        },
      ];
    case "/hotelOwners":
      return [
        {
          id: 1,
          name: "Frank Wilson",
          email: "frank@example.com",
          phone: "+1222333444",
          status: "active",
          joinedAt: "2023-01-10",
          hotels: 2,
        },
        {
          id: 2,
          name: "Grace Lee",
          email: "grace@example.com",
          phone: "+1555666777",
          status: "active",
          joinedAt: "2023-02-25",
          hotels: 1,
        },
      ];
    default:
      return [];
  }
};

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("drivers");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [users, setUsers] = useState({
    drivers: [],
    customers: [],
    hotelOwners: [],
  });

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      const drivers = await fetchData("/drivers");
      const customers = await fetchData("/users/all"); // Assuming customers are fetched from /users/all
      const hotelOwners = await fetchData("/hotelOwners");

      if (!drivers || !customers || !hotelOwners) {
        alert("Error fetching data. Displaying fallback data.");
      }
      console.log(drivers);
      console.table(customers);
      console.table(hotelOwners);

      setUsers({ drivers, customers, hotelOwners });
    };

    fetchAllUsers();
  }, []);

  // Filter users based on search term and status
  const filteredUsers = users[activeTab]?.filter((user: any) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Toggle driver authorization
  const toggleDriverAuthorization = (driverId: any) => {
    setUsers((prev: any) => ({
      ...prev,
      drivers: prev.drivers.map((driver) =>
        driver.id === driverId
          ? { ...driver, isAuthorized: !driver.isAuthorized }
          : driver
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500">Manage all users in the system</p>
      </div>
      <div className="flex flex-col space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Users Overview</CardTitle>
            <CardDescription>
              Manage drivers, customers, and hotel owners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="drivers"
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TabsList>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="hotelOwners">Hotel Owners</TabsTrigger>
                </TabsList>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="pl-8 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <TabsContent value="drivers" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Joined
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Authorization</TableHead>
                        <TableHead>Autherization Docs</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers?.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No drivers found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers?.map((driver) => (
                          <TableRow key={driver.id}>
                            <TableCell className="font-medium">
                              {driver.usernmame}
                            </TableCell>
                            <TableCell>{driver.email}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {driver.phoneNo}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {driver.createdAt}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  driver.isActive 
                                    ? "default"
                                    : !driver.isActive 
                                    ? "outline"
                                    : "secondary"
                                }
                                className={
                                  driver.isActive
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : !driver.isActive
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {driver.isActive ? "Active": "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {driver.isAuthorized ? (
                                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Authorized
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-red-800 border-red-300"
                                >
                                  <ShieldAlert className="h-3 w-3 mr-1" />
                                  Unauthorized
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div>
                                {driver.authCertificates ? (
                                  Object.entries(driver.authCertificates).map(
                                    ([docName, cloudinaryLink]) => (
                                      <div
                                        key={docName}
                                        className="flex items-center gap-2"
                                      >
                                        <span>{docName}</span>{" "}
                                        {/* Display the document name */}
                                        <Button
                                          variant="link"
                                          className="text-blue-500"
                                          onClick={() =>
                                            window.open(
                                              cloudinaryLink,
                                              "_blank"
                                            )
                                          } // Open the Cloudinary link in a new tab
                                        >
                                          View
                                        </Button>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <span>No documents available</span> // Fallback if no certificates are present
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      toggleDriverAuthorization(driver.id)
                                    }
                                  >
                                    {driver.isAuthorized
                                      ? "Revoke Authorization"
                                      : "Authorize Driver"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="customers" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Joined
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers?.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No customers found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers?.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                              {customer.name}
                            </TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {customer.phone}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {customer.joinedAt}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  customer.status === "active"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  customer.status === "active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {customer.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{customer.orders}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    View Orders
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="hotelOwners" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Joined
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Hotels</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers?.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No hotel owners found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers?.map((owner) => (
                          <TableRow key={owner.id}>
                            <TableCell className="font-medium">
                              {owner.name}
                            </TableCell>
                            <TableCell>{owner.email}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {owner.phone}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {owner.joinedAt}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  owner.status === "active"
                                    ? "default"
                                    : owner.status === "pending"
                                    ? "outline"
                                    : "secondary"
                                }
                                className={
                                  owner.status === "active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : owner.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {owner.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{owner.hotels}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    View Hotels
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
