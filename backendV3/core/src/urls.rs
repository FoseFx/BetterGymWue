pub const BASE_URL: &str = "https://gymnasium-wuerselen.de/untis";

pub mod lehrer {
    pub fn auth_url() -> String { format!("{}/Lehrer-Stundenplan/frames/navbar.htm", super::BASE_URL) }
}
pub mod schueler {
    pub fn auth_url() -> String { format!("{}/Schueler-Stundenplan/frames/navbar.htm", super::BASE_URL) }
}

