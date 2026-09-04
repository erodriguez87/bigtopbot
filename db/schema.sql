-- Core products table housing shared commercial and identification attributes
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Mower', 'Vacuum')),
    name VARCHAR(150) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Prioritized Core Metric
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Extended attributes for Robot Mowers featuring all critical performance metrics
CREATE TABLE mower_specs (
    product_id INT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    acreage VARCHAR(50) NOT NULL,            -- Prioritized Core Metric (Mowing Capacity)
    cutting_width VARCHAR(50),
    max_incline VARCHAR(50) NOT NULL,        -- Prioritized Core Metric (Slope Handling)
    boundary_wire BOOLEAN NOT NULL,
    navigation TEXT NOT NULL,                -- Prioritized Core Metric
    blade_type VARCHAR(100) NOT NULL,        -- Prioritized Core Metric
    removable_battery BOOLEAN NOT NULL,      -- Prioritized Core Metric
    drive_type VARCHAR(50) NOT NULL,         -- Prioritized Core Metric (e.g., RWD, AWD)
    cutting_height_range VARCHAR(50),
    runtime_minutes INT,
    ip_rating VARCHAR(20),
    noise_level_db INT
);

-- Extended attributes for Robot Vacuums
CREATE TABLE vacuum_specs (
    product_id INT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    suction_power VARCHAR(50),
    obstacle_avoidance BOOLEAN,
    self_emptying_base BOOLEAN
);

-- Articles / News feed table for content publishing
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    published_date DATE DEFAULT CURRENT_DATE
);
