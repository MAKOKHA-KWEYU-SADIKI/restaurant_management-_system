import { timeStamp } from "console";
import { Many, not ,relations} from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import { boolean, decimal } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { pgTable,serial,text,date,varchar,} from "drizzle-orm/pg-core";
export const tableState=pgTable("state",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    code:varchar("code",{length:255}).notNull(),
    city:text("city").notNull()

});
export const tableCity=pgTable("city",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    state_id:integer("state_id").notNull().references(()=>tableState.id,{onDelete:"cascade"}),
    address:text("address").notNull(),
    state:text("state").notNull(),
    restorand:text("restorand").notNull(),
});
export const tableRestaurant=pgTable("restaurant",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    street_address:varchar("street_address",{length:255}).notNull(),
    zip_code:varchar("zip_code",{length:255}).notNull(),
    city_id:integer("city_id").notNull().references(()=>tableCity.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    menu_item:text("menu_item").notNull(),
    orders:text("orders").notNull(),
    city:text("city").notNull(),
    restaurand_owner:text("resteraurand_owner").notNull()
});
export const tableCategory=pgTable("category",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    menu_item:text("menu_item").notNull(),
});
export const tableMenu_item=pgTable("menu_item",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    restaurand_id:integer("restaurand_id").notNull().references(()=>tableRestaurant.id,{onDelete:"cascade"}),
    category_id:integer("category_id").notNull().references(()=>tableCategory.id,{onDelete:"cascade"}),
    description:varchar("description").notNull(),
    ingredient:varchar("ingredient").notNull(),
    price:decimal("price").notNull(),
    active:boolean("active").notNull(),
    created_at:timestamp("created_at").notNull(),
    update_at:timestamp("updated_at").notNull(),
    category:text("category").notNull(),
    order_menu_item:text("oder_menu_item").notNull(),
});
export const tableUsers=pgTable("users",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    contact_phone:varchar("contact_phone",{length:255}).notNull(),
    phone_verified:boolean("phone_verified").notNull(),
    email:varchar("email").notNull(),
    email_verified:boolean("email_verified").notNull(),
    confirmation_code:varchar("confirmation_code"),
    password:varchar("password",{length:255}).notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    address:text("address").notNull(),
    comment:text("comment").notNull(),
    driver:text("driver").notNull(),
    orders:text("orders").notNull(),
    restaurant_owner:text("restaurant_owner").notNull(),
});
export const tableOrders=pgTable("orders",{
    id:serial("id").primaryKey(),
    restaurant_id:integer("restaurand_id").notNull().references(()=>tableRestaurant.id,{onDelete:"cascade"}),
    estimate_delivery_time:date("estimate_delivery_time").notNull(),
    actuall_delivery_time:date("actual_deliver_time").references(()=>tableAddress.id,{onDelete:"cascade"}),
    delivery_address_id:integer("delivery_address_id").notNull(),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    driver_id:integer("driver_id").references(()=>tableDriver.id,{onDelete:"cascade"}),
    price:decimal("price").notNull(),
    discount:decimal("discount").notNull(),
    final_price:decimal("final_price").notNull(),
    comment:varchar("comment",{length:255}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    comments:text("comments").notNull(),
    oder_menu_item:text("oder_menu-item").notNull(),
    order_status:text("order_status").notNull(),
    driver:varchar("driver",{length:255}),
    restaurant:text("restaurant").notNull(),
    users:text("users").notNull(),
});
export const tableOder_menu_item=pgTable("order_menu_item",{
    id:serial("id").primaryKey(),
    order_id:integer("order_id").notNull().references(()=>tableOrders.id,{onDelete:"cascade"}),
    menu_item_id:integer("menu_item_id").notNull().references(()=>tableMenu_item.id,{onDelete:"cascade"}),
    quantity:integer("quantity").notNull(),
    item_price:decimal("item_price").notNull(),
    price:decimal("price").notNull(),
    comment:varchar("commant").notNull(),
    menu_item:text("menu").notNull(),
    orders:text("orders").notNull(),
});
export const tableRestaurant_owner=pgTable("restaurant_owner",{
    id:serial("id").primaryKey(),
    restaurant_id:integer("restaurant_id").notNull().references(()=>tableRestaurant.id,{onDelete:"cascade"}),
    owner_id:integer("owner").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    users:text("users").notNull(),
    restaurant:text("restaurant").notNull(),
});
export const tableAddress=pgTable("address",{
    id:serial("id").primaryKey(),
    street_address_1:varchar("street_address_1",{length:255}).notNull(),
    street_address_2:varchar("street_address_2",{length:255}).notNull(),
    zip_code:varchar("zip_code").notNull(),
    delivery_instructions:varchar("delivery_instructions"),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    city_id:integer("city_id").notNull().references(()=>tableCity.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    city:text("city").notNull(),
    users:text("users").notNull(),
    orders:text("orders").notNull(),
});
export const tableComment=pgTable("comment",{
    id:serial("id").primaryKey(),
    order_id:integer("order_id").notNull().references(()=>tableOrders.id,{onDelete:"cascade"}),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    comment_text:varchar("comment_text",{length:255}).notNull(),
    is_complaint:boolean("is_complaint").notNull(),
    is_praise:boolean("is_praise").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    orders:text("orders").notNull(),
    users:text("users").notNull(),
});

export const tableDriver=pgTable("driver",{
    id:serial("id").primaryKey(),
    car_make:varchar("car_make").notNull(),
    car_model:varchar("car_model").notNull(),
    car_year:integer("car_year").notNull(),
    user_id:integer("user_id").notNull().references(()=>tableUsers.id,{onDelete:"cascade"}),
    online:boolean("online").notNull(),
    delivering:boolean("delivering").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    users:text("users").notNull(),
    oders:text("oders").notNull(),
});

export const tableOrder_status=pgTable("order_status",{
    id:serial("id").primaryKey(),
    order_id:integer("order_id").notNull().references(()=>tableOrders.id,{onDelete:"cascade"}),
    status_id:integer("status_id").notNull().references(()=>tableStatus_catalog.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    orders:text("orders"),
    status_catalog:text("status_catalog").notNull(),
});
export const tableStatus_catalog=pgTable("status_catalog",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}),
    order_status:text("order_status").notNull(),
});

//our relations
// export const stateRelation=relations(tableState,({one})=>({
//     relState:Many(tableCity,{
//         fields:[tableState.id],
//         references:[tableCity.state_id]
//     })
// }))
// export const cityRelation=relations(tableCity,({one})=>{
//     relCity:one(tableCity,{
//         fields:[]
//     })
// })